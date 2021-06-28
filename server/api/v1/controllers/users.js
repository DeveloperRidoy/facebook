const User = require("../../../mongoDb/models/User");
const catchAsync = require("../../../utils/functions/catchAsync");
const AppError = require("./appError");



// @route => GET api/v1/users
// @description => get all users
// @privacy => public
exports.getAllUsers = () => catchAsync(async () => {
    const users = await User.find();
    return res.json({
      status: "success",
      results: users.length,
      data: { users },
    });
})
