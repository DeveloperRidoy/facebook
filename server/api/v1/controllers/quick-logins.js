const { addDocs, getDocs, deleteDocs, updateDoc } = require("./handlerFactory");
const QuickLogin = require('../../../mongoDb/models/QuickLogin');
const catchAsync = require("../../../../utils/server/functions/catchAsync");
const AppError = require("../middlewares/AppError");
const jwtCookieToken = require("../../../../utils/server/functions/jwtCookieToken");
const jwt = require('jsonwebtoken');
const User = require("../../../mongoDb/models/User");


// @route           POST api/v1/quick-logins
// @description     Add a quick login
// @accessibllity   user 
exports.getAllLogins = () => getDocs(QuickLogin); 

// @route           POST api/v1/quick-logins
// @description     Add a quick login
// @accessibllity   user
exports.addLogin = () => catchAsync(async (req, res, next) => {

    // check if logins array is provided 
    if (!req.body.logins || !Array.isArray(req.body.logins) || req.body.logins.length === 0) {
        return next(new AppError(400, 'please provide logins array with objects containing property of id and rememberPassword'))
    } 

    const newLogin = await QuickLogin.create(req.body);
    return res.json({
        status: 'success',
        message: 'quick login added',
        data: {quickLogin: newLogin}
    })
})

// @route           DELETE api/v1/quick-logins
// @description     Delete all quick logins 
// @accessibllity   admin 
exports.deleteAllLogins = () => deleteDocs(QuickLogin);


// @route           DELETE api/v1/quick-logins
// @description     Delete all quick logins 
// @accessibllity   admin 
exports.updateLogin = () => updateDoc(QuickLogin);

// @route           DELETE api/v1/quick-logins/:id
// @description     Delete quick login by id 
// @accessibllity   user 
exports.deleteQuickLogin = () => catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const quickLoginsToken = req.signedCookies["quick-logins-token"];

    // check if token is valid
    const validToken = jwt.verify(quickLoginsToken, process.env.JWT_SECRET);
    if (!validToken) return next(new AppError(400, "not authorized 1"));

    // check if quickLogin exists
    const quickLogin = await QuickLogin.findById(validToken.id);
    if (!quickLogin) return next(new AppError(400, "not authorized 2"));
  
    // check if login exists with user;
  const loginIndex = quickLogin.logins.findIndex((login) => String(login.user?._id) === String(id));
  if (loginIndex === -1) return next(new AppError(400, 'not authorized'));

    // delete login
    quickLogin.logins = quickLogin.logins.filter((login) => String(login.user._id) !== String(id));
    updatedQuickLogin = await quickLogin.save();
   
    // return response
    return res.json({
      status: "success",
      message: "removed",
      data: { quickLogins: updatedQuickLogin },
    });
  
})


// @route           POST api/v1/quick-logins/auth 
// @description     authenticate quick login 
// @accessibllity   public  
exports.quickLoginAuth = () => catchAsync(async (req, res, next) => {
  // userId
  const userId = req.params.id;

  // token
  const quickLoginsToken = req.signedCookies["quick-logins-token"];

  // check if token is provided
  if (!quickLoginsToken) return next(new AppError(400, "not authorized"));

  // check if token is valid
  const validToken = jwt.verify(quickLoginsToken, process.env.JWT_SECRET);
  if (!validToken) return next(new AppError(400, "not uathorized"));

  // check if quickLogin with id exists
  const quickLogin = await QuickLogin.findById(validToken.id);
  if (!quickLogin) return next(new AppError(401, "not authorized"));

  // check if login with userId exists
  const loginIndex = quickLogin.logins.findIndex((login) => {
    if (login.user === null) return next(new AppError(400, "user not found"));
    return String(login.user?._id) === String(userId);
  });
  const login = quickLogin.logins[loginIndex];

  if (!login) return next(new AppError(400, "not authorized"));

  // check if rememberPassword is true
  if (!login.rememberPassword)
    return next(new AppError(400, "not authorized"));

  // return user-auth-token;
  const userAuthToken = jwtCookieToken(
    { id: login.user._id },
    "user-auth-token",
    req,
    res
  );

    // get full user info 
    const user = await User.findById(login.user._id);

  // return resposne
  return res.json({
    status: "success",
    message: "logged in",
    userAuthToken,
    data: { user },
  });
})
