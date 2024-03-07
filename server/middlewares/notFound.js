const AppError = require("../../utils/server/AppError");

const notFound = (req, res, next) => {
  return next(new AppError(404, "resource not found"));
};

module.exports = notFound;
