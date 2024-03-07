import User from "../models/user";
import catchAsync from "../../utils/server/catchAsync";
import AppError from "../../utils/server/AppError";
const {
  getDocs,
  deleteDocs,
  deleteDocById,
  getDocById,
} = require("./handlerFactory");

// @route           GET api/users
// @description     get all users
// @accessibllity   public
export const getAllUsers = getDocs(User);

// @route           GET api/users/:id
// @description     get user by id
// @accessibllity   public
export const getUserById = getDocById(User, { path: "friends posts" });

// @route           DELETE api/users
// @description     delete all users
// @accessibllity   admin
export const deleteAllUsers = deleteDocs(User);

// @route           DELETE api/users/:d
// @description     delete user by id
// @accessibllity   admin
export const deleteUserById = deleteDocById(User);

// @route           GET api/users/name/:name
// @description     get user by name
// @accessibllity   public
export const getUsersByName = catchAsync(async (req, res, next) => {
  const name = req.params.name.toLowerCase().trim().replace(/\s+/g, " ");

  const users = await User.find({
    fullName: new RegExp(`(${name})`, "i"),
  }).select("fullName photo slug");

  return res.json({
    status: "success",
    results: users.length,
    data: { users },
  });
});

// @route           PATCH api/users
// @description     update user
// @accessibllity   user (expecting req.user from the previous middleware)
export const updateMe = catchAsync(async (req, res, next) => {
  let error = false;
  Object.keys(req.body).forEach((key) => {
    // check for unauthorized inputs
    if (
      key === "passwordChangedAt" ||
      key === "password" ||
      key === "confirmPassword" ||
      key === "_id"
    ) {
      error = true;
      return next(
        new AppError(401, `you do not have permission to update ${key}`)
      );
    }
  });

  // do not proceed if error
  if (error) return;

  // update user
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: req.body },
    { new: true, runValidators: true }
  ).populate({ path: "friends posts" });

  // return response
  return res.json({
    status: "success",
    message: "user updated successfully",
    data: { user: updatedUser },
  });
});

// @route           GET api/users/slug/:slug
// @description     get user by slug
// @accessibllity   public
export const getUserBySlug = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;

  // get user
  const user = await User.findOne({ slug }).populate("friends posts");

  if (!user) return next(new AppError(404, `user not found`));

  // return response
  return res.json({
    status: "success",
    data: { user },
  });
});
