const AppError = require("../../utils/server/AppError");
const mongoose = require("mongoose");

const checkId = () => (req, res, next) => {
  if (!req.params.id) return next(new AppError(400, "id is required"));

  if (!mongoose.isValidObjectId(req.params.id))
    return next(new AppError(400, "invalid id"));

  return next();  
};

module.exports = checkId;
