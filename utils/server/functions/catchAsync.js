const AppError = require("../../../server/api/v1/middlewares/AppError")
const Mongoose = require('mongoose');

const catchAsync = (fn) => (req, res, next) => {
    fn(req, res, next).catch(err => {
      // catch mongoose error 
      if (err instanceof Mongoose.Error.ValidationError) {
        const message = err.errors[Object.keys(err.errors)[0]].message;
        return next(new AppError(400, message));
      }
      return next(new AppError(500, err.message));
    });       
}        


module.exports = catchAsync;     