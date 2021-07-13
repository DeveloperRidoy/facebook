const User = require("../../../mongoDb/models/User");
const catchAsync = require("../../../../utils/server/functions/catchAsync");
const AppError = require("../middlewares/AppError");
const jwt = require("jsonwebtoken");
const jwtCookieToken = require("../../../../utils/server/functions/jwtCookieToken");
const addOrUpdateQuickLogins = require("../../../../utils/server/functions/addOrUpdateQuickLoginsToken");
const QuickLogin = require("../../../mongoDb/models/QuickLogin");

// @route           GET api/v1/users/auth
// @description     authenticate user from cookie
// @accessibllity   public
exports.authenticate = () =>
  catchAsync(async (req, res, next) => {
    // tokens
    const userAuthToken = req.signedCookies["user-auth-token"];
    const quickLoginsToken = req.signedCookies["quick-logins-token"];
    // verify quickLoginsToken if provided
    let quickLogins;
    if (quickLoginsToken) {
      const validToken = jwt.verify(quickLoginsToken, process.env.JWT_SECRET);
      if (validToken) {
        const logins = await QuickLogin.findById(validToken.id);
        if (logins) {
          quickLogins = logins;
        }
      }
    }

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
    );
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
    const quickLogins = await addOrUpdateQuickLogins(req, user);
    const quickLoginsToken = jwtCookieToken({ id: quickLogins._id }, 'quick-logins-token', req, res);

    // return user-auth-token
    const userAuthToken = jwtCookieToken({id: user._id}, 'user-auth-token', req, res);

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
    if (!email)
      return next(new AppError(400, "Please provide your email"));

    // check if password is provided
    if (!password)
      return next(new AppError(400, "Please provide your password"));

    // check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new AppError(404, "User not found"));

    // check is passwords match
    const passwordsMatch = await user.comparePassword(password);
    if (!passwordsMatch) return next(new AppError(400, "Password incorrect"));

    // // add or update quick-logins
    const quickLogins = await addOrUpdateQuickLogins(
      req,
      user,
      rememberPassword,
    );

    // return signed cookie named quick-logins-token
    const quickLoginsToken = jwtCookieToken(
      { id: quickLogins._id },
      "quick-logins-token",
      req,
      res
    );

    // return signed cookie named user-auth-token
    const userAuthToken = jwtCookieToken(
      { id: user._id },
      "user-auth-token",
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
    res.cookie("user-auth-token", "logged out", {
      expires: new Date(Date.now()),
    });

    // return response
    return res.json({
      status: "success",
      message: "logged out",
    });
  });
