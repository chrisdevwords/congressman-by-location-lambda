

class CustomError extends Error {

    constructor(message, statusCode = 500) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = statusCode;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

export default CustomError;
