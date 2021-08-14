const User = require("../../../mongoDb/models/User");
const catchAsync = require("../../../../utils/server/functions/catchAsync");
const AppError = require("../middlewares/AppError");
const { getDocs, deleteDocs, deleteDocById,  getDocById } = require("./handlerFactory");

// @route           GET api/v1/users
// @description     get all users
// @accessibllity   public
exports.getAllUsers = () => getDocs(User);

// @route           GET api/v1/users/:id
// @description     get user by id 
// @accessibllity   public
exports.getUserById = () => getDocById(User, {path: 'friends posts'})

// @route           DELETE api/v1/users
// @description     delete all users
// @accessibllity   admin
exports.deleteAllUsers = () => deleteDocs(User);

// @route           DELETE api/v1/users/:id 
// @description     delete user by id
// @accessibllity   admin
exports.deleteUserById = () => deleteDocById(User);


// @route           GET api/v1/users/name/:name 
// @description     get user by name
// @accessibllity   public
exports.getUsersByName = () => catchAsync(async (req, res, next) => {
  const name = req.params.name.toLowerCase().trim().replace(/\s+/g, " ");

  const users = await User.find({
    fullName: new RegExp(`^(${name})`, "i"),
  }).select("fullName photo slug");

  return res.json({
    status: "success",
    results: users.length,
    data: { users },
  });
});

// @route           PATCH api/v1/users
// @description     update user
// @accessibllity   user (expecting req.user from the previous middleware)
exports.updateMe = () => catchAsync(async (req, res, next) => {
  let error = false;
    Object.keys(req.body).forEach(key => {
        // check for unauthorized inputs
        if (key === 'passwordChangedAt' || key === 'password' || key === 'confirmPassword' || key === '_id') {
            error = true;
            return next(
              new AppError(401, `you do not have permission to update ${key}`)
            );
        }
    })

    // do not proceed if error 
    if (error) return;
  
    // update user 
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {$set: req.body},
      { new: true, runValidators: true }
    ).populate({path: 'friends posts'});          

    // return response 
    return res.json({
      status: "success",
      message: "user updated successfully",
      data: { user: updatedUser },
    });
})

// @route           GET api/v1/users/slug/:slug  
// @description     get user by slug 
// @accessibllity   public
exports.getUserBySlug = () =>
  catchAsync(async (req, res, next) => {
    const slug = req.params.slug.toLowerCase().trim();

    // get user
    const user = await User.findOne({ slug }).populate('friends posts');
    
    if(!user) return next(
      new AppError(404, `user not found`)
    );
 
    // return response
    return res.json({
      status: "success",
      data: { user },
    });
  });
