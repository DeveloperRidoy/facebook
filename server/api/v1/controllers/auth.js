const User = require("../../../mongoDb/models/User");
const catchAsync = require("../../../../utils/server/functions/catchAsync");
const AppError = require("../middlewares/AppError");
const jwt = require('jsonwebtoken');
const jwtCookieToken = require("../../../../utils/server/functions/jwtCookieToken");

// @route           GET api/v1/users/auth
// @description     authenticate user from cookie
// @accessibllity   public    
exports.authenticate = () => catchAsync(async (req, res, next) => {
  
  const authToken = req.signedCookies['user-auth-token'] || req.headers.authorization?.split(' ')[1];
                 
  // check if authToken is provided
  if (!authToken) return res.json({ status: 'fail', message: 'not logged in' });

  // check if token is valid 
  const validToken = jwt.verify(authToken, process.env.JWT_SECRET); 
  if (!validToken) return res.json({ status: 'fail', message: 'not logged in' });

  // check if user still exits from the id in validToken;
  const user = await User.findById(validToken.id).select('+passwordChangedAt');
  if (!user) return res.json({ status: 'fail', message: 'user does not exist anymore' });


  // check if user changed password after current token 
  const changedPassword = validToken.iat * 1000 < user.passwordChangedAt;
  if (changedPassword) return res.json({ status: 'fail', message: 'user recently changed password.Please login again', data: {user: null} });

  // return user on successful authentication 
  return res.json({
    status: 'success',
    message: "you are logged in",
    data: {user}
  })
});


// @route           POST api/v1/users/auth/signup
// @description     signup user
// @accessibllity   public
exports.registerUser = () => catchAsync(async (req, res, next) => {
  const data = req.body;
    const user = await User.create(data);

    // return jsonwebtoken via cookie 
    const token = jwtCookieToken(user, req, res);

    // remove password before passing data 
    user.password = undefined;
  return res.json({
    status: 'success',
    message: 'Signup successful',
    token,
    data: { user},
  })
})

// @route           POST api/v1/users/auth/login
// @description     login user
// @accessibllity   public
exports.loginUser = () => catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password is provided 
  if (!email || !password) return next(new AppError(400, 'Please provide your email and password'));

  // check if user exists 
  const user = await User.findOne({ email }).select('+password');
  if (!user) return next(new AppError(404, 'User not found'))
  
  // check is passwords match
  const passwordsMatch = await user.comparePassword(password);
  if (!passwordsMatch) return next(new AppError(400, 'Password incorrect'));

  // return jsonwebtoken and user-auth-cookie
  const token = jwtCookieToken(user, req, res);

  return res.json({
    status: "success",
    message: "login successful",
    token,
    data: {user}
    
  })
})

// @route           GET api/v1/users/auth/logout
// @description     logout user 
// @accessibllity   User 
exports.logoutUser = () => catchAsync(async (req, res, next) => {
  // expire the cookie 
  res.cookie('user-auth-token', 'logged out', { expires: new Date(Date.now()) })

  // return response 
  return res.json({
    status: 'success',
    message: 'logged out'
  })
})
