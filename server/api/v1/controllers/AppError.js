
class AppError extends Error {
    constructor (code, message) {
        super(Error),
        this.code = code, 
        this.message = message

        // enable stack tracing
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
