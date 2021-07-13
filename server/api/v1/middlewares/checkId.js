const AppError = require("./AppError")

const checkId = () => (req, res, next) => {
    if (!req.params.id)  return next(new AppError(400, 'id is required')); 

    if (req.params.id.length !== 24) return next(new AppError(400, 'invalid id'))
    

    return next();
}


module.exports = checkId;