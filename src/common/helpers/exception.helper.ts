import { statusCodes } from "@/common/helpers/statusCode.helper.js";

export class HttpException extends Error {
    code: number;

    constructor(message: string, code: number) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class BadrequestException extends HttpException {
    constructor(message = "Bad Request") {
        super(message, statusCodes.BAD_REQUEST);
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message = "Unauthorized") {
        super(message, statusCodes.UNAUTHORIZED);
    }
}
