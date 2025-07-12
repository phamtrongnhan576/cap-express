// common/helpers/exception.helper.ts
import { statusCodes } from "@/common/helpers/statusCode.helper";

export class HttpException extends Error {
    code: number;

    constructor(message: string, code: number) {
        super(message);
        this.name = new.target.name;
        this.code = code;
    }
}

export class BadrequestException extends HttpException {
    constructor(message: string = "Bad Request") {
        super(message, statusCodes.BAD_REQUEST);
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message: string = "Unauthorized") {
        super(message, statusCodes.UNAUTHORIZED);
    }
}
