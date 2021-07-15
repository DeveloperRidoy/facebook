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
exports.getUserById = () => getDocById(User)

// @route           DELETE api/v1/users
// @description     delete all users
// @accessibllity   admin
exports.deleteAllUsers = () => deleteDocs(User);

// @route           DELETE api/v1/users/:id 
// @description     delete user by id
// @accessibllity   admin
exports.deleteUserById = () => deleteDocById(User);




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

        // update user 
        req.user[key] = req.body[key];
    })

    // do not proceed if error 
    if (error) return;

    // save user 
    const updatedUser = await req.user.save();             

    // return response 
    return res.json({
      status: "success",
      message: "user updated successfully",
      data: { user: updatedUser },
    });
})

