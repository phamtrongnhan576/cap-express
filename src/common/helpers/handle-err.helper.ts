import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { responseError } from "@/common/helpers/response.helper.js";
import { statusCodes } from "./statusCode.helper.js";

export const handleError = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(`Middleware ERROR ĐẶC BIỆT`, err);

    let statusCode = statusCodes.INTERNAL_SERVER_ERROR;

    if (err instanceof jwt.JsonWebTokenError) {
        console.log("Token không hợp lệ");
        statusCode = statusCodes.UNAUTHORIZED;
    } else if (err instanceof jwt.TokenExpiredError) {
        console.log("Token hết hạn");
        statusCode = statusCodes.FORBIDDEN;
    } else if (err.code === "P2022") {
        console.log("Lỗi ràng buộc duy nhất trong cơ sở dữ liệu");
        statusCode = statusCodes.BAD_REQUEST;
    }

    const resData = responseError({
        message: err?.message,
        statusCode,
        stack: err?.stack,
    });

    res.status(resData.statusCode).json(resData);
};
