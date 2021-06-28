const AppError = require("../../api/v1/controllers/appError")

const catchAsync = (fn) => (req, res, next) => {
    fn(req, res, next).catch(err => next(new AppError(500, err.message)));
}


module.exports = catchAsync;