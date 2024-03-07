const jwt = require("jsonwebtoken");
const { USER_AUTH_TOKEN } = require("../../utils/server/variables");
const addOrUpdateQuickLoginsToken = require("../../utils/server/addOrUpdateQuickLoginsToken");
import User from "../models/user";
import AppError from "../../utils/server/AppError";
const {
  setCookie,
  removeCookie,
} = require("../../utils/server/jwtCookieToken");
const catchAsync = require("../../utils/server/catchAsync");

// @route           GET api/users/auth
// @description     authenticate user from cookie
// @accessibllity   public
export const authenticate = catchAsync(async (req, res, next) => {
  // tokens
  const userAuthToken = req.cookies[USER_AUTH_TOKEN];

  const { quickLogins } = await addOrUpdateQuickLoginsToken(req, res, next);

  // check if userAuthToken is provided
  if (!userAuthToken)
    return res.json({
      status: "fail",
      message: "not logged in",
      data: { quickLogins },
    });

  // check if userAuthToken is valid
  const validUserAuthToken = jwt.verify(userAuthToken, process.env.JWT_SECRET);
  if (!validUserAuthToken)
    return res.json({
      status: "fail",
      message: "not logged in",
      data: { quickLogins },
    });

  // check if user still exits from the id in validUserAuthToken;
  const user = await User.findById(validUserAuthToken.id)
    .select("+passwordChangedAt")
    .populate("posts friends");
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

// @route           POST api/users/auth/signup
// @description     signup user
// @accessibllity   public
export const registerUser = catchAsync(async (req, res, next) => {
  const data = req.body;
  const user = await User.create(data);

  // return quick-logins-token
  const { quickLogins, quickLoginsToken } = await addOrUpdateQuickLoginsToken(
    req,
    res,
    next,
    user
  );

  // return user-auth-token
  const userAuthToken = setCookie({ id: user._id }, USER_AUTH_TOKEN, req, res);

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

// @route           POST api/users/auth/login
// @description     login user
// @accessibllity   public
export const loginUser = catchAsync(async (req, res, next) => {
  // inputData
  const { email, password, rememberPassword } = req.body;

  // check if email is provided
  if (!email) return next(new AppError(400, "Please provide your email"));

  // check if password is provided
  if (!password) return next(new AppError(400, "Please provide your password"));

  // check if user exists
  const user = await User.findOne({ email })
    .select("+password")
    .populate("posts friends");
  if (!user) return next(new AppError(404, "User not found"));

  // add or update quick-logins
  const { quickLogins, quickLoginsToken } = await addOrUpdateQuickLoginsToken(
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
  const userAuthToken = setCookie({ id: user._id }, USER_AUTH_TOKEN, req, res);

  return res.json({
    status: "success",
    message: "login successful",
    userAuthToken,
    quickLoginsToken,
    data: { user, quickLogins },
  });
});

// @route           GET api/users/auth/logout
// @description     logout user
// @accessibllity   User
export const logoutUser = catchAsync(async (req, res, next) => {
  // expire the cookie
  removeCookie(USER_AUTH_TOKEN, req, res);

  // return response
  return res.json({
    status: "success",
    message: "logged out",
  });
});

// @route           GET api/users/auth/quick-login/:id
// @description     quick login user
// @accessibllity   public
export const quickLogin = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  // check if token exists
  const quickLoginsToken = req.cookies[QUICK_LOGINS_TOKEN];
  if (!quickLoginsToken) return next(new AppError(401, "not authorized"));

  // check if token is valid
  const validToken = jwt.verify(quickLoginsToken, process.env.JWT_SECRET);
  if (!validToken) return next(new AppError(401, "not authorized"));

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
  const userAuthToken = setCookie({ id: user._id }, USER_AUTH_TOKEN, req, res);

  // return response
  return res.json({
    status: "success",
    message: "logged in",
    userAuthToken,
    quickLoginsToken,
    data: { user, quickLogins: tokenData },
  });
});
