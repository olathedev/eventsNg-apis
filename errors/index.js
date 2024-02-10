import {StatusCodes} from "http-status-codes"

export class CustomApiError extends Error {
    constructor(message) {
        super(message)
    }
}

export class BadRequest extends CustomApiError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}


export class NotFound extends CustomApiError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

export class UnAuthorised extends CustomApiError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

