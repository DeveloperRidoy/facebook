const AppError = require("./AppError")

const notFound = (req, res, next) => {
    return next(new AppError(404, 'resource not found'));
}

module.exports = notFound;