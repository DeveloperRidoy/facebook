const mongoose = require("mongoose");
const AppError = require("./AppError");

const catchAsync = (fn) => (req, res, next) =>
  fn(req, res, next).catch((err) => {
    // log error message in development
    if (process.env.NODE_ENV !== "production") console.log(err, err.stack);

    // handle mongoose validation error
    if (err instanceof mongoose.Error.ValidationError) {
      const message = err.errors[Object.keys(err.errors)[0]].message;
      return next( new AppError(400, message));
     
    } 

    if (err && err.code === 11000)
      return next(new AppError(400,"document with same name already exists" ));
      

    return next(new AppError(err.code || 500, err.message));
  });

module.exports = catchAsync;
 