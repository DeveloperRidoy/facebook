const AppError = require("../../api/v1/middlewares/AppError")

const catchAsync = (fn) => (req, res, next) => {
    fn(req, res, next).catch(err => {  
        return next(new AppError(500, err.message))
    });      
}        


module.exports = catchAsync;