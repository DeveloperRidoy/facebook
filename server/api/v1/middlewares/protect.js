const catchAsync = require("../../../../utils/server/functions/catchAsync");
const jwt = require('jsonwebtoken');
const User = require("../../../mongoDb/models/User");
const AppError = require("./AppError");

const protect = (...roles) => catchAsync(async (req, res, next) => {
    const authToken = req.signedCookies['user-auth-token'] || req.headers.authorization?.split(' ')[1] || null;
 
  // check if authToken is provided
  if (!authToken) return next(new AppError(400, 'not logged in',));

  // check if token is valid 
  const validToken = jwt.verify(authToken, process.env.JWT_SECRET); 
  if (!validToken) return next(new AppError(401, 'not logged in'));

  // check if user still exits from the id in validToken;
  const user = await User.findById(validToken.id).select('+passwordChangedAt');
  if (!user) return next(new AppError(400, 'user does not exist anymore'));

  // check if user changed password after current token 
  const changedPassword = validToken.iat * 1000 < user.passwordChangedAt;
    if (changedPassword) return next(new AppError(400, 'user recently changed password.Please login again'));
    
  // check if user role is permitted 
  if (roles.length > 0) {
    const userPermitted = roles.some((role) => role === user.role);
    if (!userPermitted) return next(new AppError(401, "user not authorized"));
  }
  
    // attach user to the request to use in the next middleware 
    req.user = user;

    // go to next middleware 
    return next();
})

module.exports = protect; 