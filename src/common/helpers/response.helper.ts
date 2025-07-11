import {
    ErrorResponse,
    SuccessResponse,
    ErrorOptions,
    SuccessOptions,
} from "@/common/types/response.type.js";

const DOC_URL = "http://localhost:3000";

export const responseSuccess = <T = any>(
    options: SuccessOptions<T> = {}
): SuccessResponse<T> => {
    const { data = null, message = "OK", statusCode = 200 } = options;

    return {
        status: "success",
        statusCode,
        message,
        data,
        doc: DOC_URL,
    };
};

export const responseError = (options: ErrorOptions = {}): ErrorResponse => {
    const {
        message = "Internal Server Error",
        statusCode = 500,
        stack = null,
    } = options;

    return {
        status: "error",
        statusCode,
        message,
        stack,
        doc: DOC_URL,
    };
};
