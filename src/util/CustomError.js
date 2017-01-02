

class CustomError extends Error {

    constructor(message, statusCode = 500) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;
