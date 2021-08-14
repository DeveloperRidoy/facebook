const User = require("../../../mongoDb/models/User");
const catchAsync = require("../../../../utils/server/functions/catchAsync");
const AppError = require("../middlewares/AppError");
const jwt = require("jsonwebtoken");
const jwtCookieToken = require("../../../../utils/server/functions/jwtCookieToken");
const addOrUpdateQuickLogins = require("../../../../utils/server/functions/addOrUpdateQuickLoginsToken");
const {USER_AUTH_TOKEN, QUICK_LOGINS_TOKEN } = require('../../../../utils/server/variables');

// @route           GET api/v1/users/auth
// @description     authenticate user from cookie
// @accessibllity   public
exports.authenticate = () =>
  catchAsync(async (req, res, next) => {
    // tokens
    const userAuthToken = req.signedCookies[USER_AUTH_TOKEN];
   
    const { quickLogins } = await addOrUpdateQuickLogins(req, res, next);

    // check if userAuthToken is provided
    if (!userAuthToken)
      return res.json({
        status: "fail",
        message: "not logged in",
        data: { quickLogins },
      });

    // check if userAuthToken is valid
    const validUserAuthToken = jwt.verify(
      userAuthToken,
      process.env.JWT_SECRET
    );
    if (!validUserAuthToken)
      return res.json({
        status: "fail",
        message: "not logged in",
        data: { quickLogins },
      });

    // check if user still exits from the id in validUserAuthToken;
    const user = await User.findById(validUserAuthToken.id).select(
      "+passwordChangedAt"
    ).populate('posts friends');
    if (!user)
      return res.json({
        status: "fail",
        message: "user does not exist anymore",
        data: { quickLogins },
      });

    // check if user changed password after current token
    const changedPassword =
      validUserAuthToken.iat * 1000 < user.passwordChangedAt;
    if (changedPassword)
      return res.json({
        status: "fail",
        message: "user recently changed password.Please login again",
        data: { user: null, quickLoigns: quickLogins?.logins || null },
      });

    // return user on successful authentication
    return res.json({
      status: "success",
      message: "you are logged in",
      data: { user, quickLogins },
    });
  });

// @route           POST api/v1/users/auth/signup
// @description     signup user
// @accessibllity   public
exports.registerUser = () =>
  catchAsync(async (req, res, next) => {
    const data = req.body;
    const user = await User.create(data);
    
    // return quick-logins-token 
    const {quickLogins, quickLoginsToken} = await addOrUpdateQuickLogins(req, res, next, user);

    // return user-auth-token
    const userAuthToken = jwtCookieToken({id: user._id}, USER_AUTH_TOKEN, req, res);

    // remove password before passing data
    user.password = undefined;
    return res.json({
      status: "success",
      message: "Signup successful",
      userAuthToken,
      quickLoginsToken,
      data: { user, quickLogins },
    });
  });

// @route           POST api/v1/users/auth/login
// @description     login user
// @accessibllity   public
exports.loginUser = () =>
  catchAsync(async (req, res, next) => {
    // inputData
    const { email, password, rememberPassword } = req.body;

    // check if email is provided
    if (!email) return next(new AppError(400, "Please provide your email"));

    // check if password is provided
    if (!password)
      return next(new AppError(400, "Please provide your password"));

    // check if user exists
    const user = await User.findOne({ email }).select("+password").populate('posts friends');
    if (!user) return next(new AppError(404, "User not found"));

    // add or update quick-logins
    const { quickLogins, quickLoginsToken } = await addOrUpdateQuickLogins(
      req,
      res,
      next,
      user,
      rememberPassword
    );

    // check is passwords match
    const passwordsMatch = await user.comparePassword(password);
    if (!passwordsMatch) return next(new AppError(400, "Password incorrect"));

    // return signed cookie named user-auth-token
    const userAuthToken = jwtCookieToken(
      { id: user._id },
      USER_AUTH_TOKEN,
      req,
      res
    );

    return res.json({
      status: "success",
      message: "login successful",
      userAuthToken,
      quickLoginsToken,
      data: { user, quickLogins },
    });
  });

// @route           GET api/v1/users/auth/logout
// @description     logout user
// @accessibllity   User
exports.logoutUser = () =>
  catchAsync(async (req, res, next) => {
    // expire the cookie
    res.cookie(USER_AUTH_TOKEN, "logged out", {
      expires: new Date(Date.now()),
    });

    // return response
    return res.json({
      status: "success",
      message: "logged out",
    });
  });


// @route           GET api/v1/users/auth/quick-login/:id 
// @description     quick login user 
// @accessibllity   public
exports.quickLogin = () => catchAsync(async (req, res, next) => {
  const id = req.params.id;
 
  // check if token exists
  const quickLoginsToken = req.signedCookies[QUICK_LOGINS_TOKEN];
  if (!quickLoginsToken) return next(new AppError(401, "not authorized"));

  // check if token is valid 
  const validToken = jwt.verify(quickLoginsToken, process.env.JWT_SECRET);
  if (!validToken) return next(new AppError(401, 'not authorized')); 

  // parse data
  const tokenData = JSON.parse(validToken.data);

  // check if login wiht id exists
  const login = tokenData.find((login) => String(login.user) === String(id));
  if (!login || !login.rememberPassword)
    return next(new AppError(401, "not authorized"));

  // check if user exists
  const user = await User.findById(id).select("+passwordChangedAt");
  if (!user) return next(new AppError(404, "User not found"));
  
  // user-auth-token 
  const userAuthToken = jwtCookieToken({ id: user._id }, USER_AUTH_TOKEN, req, res);
  
  // return response 
  return res.json({
    status: 'success',
    message: 'logged in',
    userAuthToken,
    quickLoginsToken,
    data: {user, quickLogins: tokenData}
  })

})  