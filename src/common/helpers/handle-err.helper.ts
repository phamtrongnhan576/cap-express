import { responseError } from "./response.helper.js";
import jwt from "jsonwebtoken";
import { statusCodes } from "./status-code.helper.js";

export const handleError = (err, req, res, next) => {
    console.log(`Middleware ERROR ĐẶC BIỆT`, err);

    let statusCode = statusCodes.INTERNAL_SERVER_ERROR; // Mặc định là 500

    // Xử lý lỗi JWT
    if (err instanceof jwt.JsonWebTokenError) {
        console.log("Token không hợp lệ");
        statusCode = statusCodes.UNAUTHORIZED; // 401
    } else if (err instanceof jwt.TokenExpiredError) {
        console.log("Token hết hạn");
        statusCode = statusCodes.FORBIDDEN; // 403
    } else if (err.code === "P2022") {
        // Xử lý lỗi Prisma P2022 (Unique constraint violation)
        console.log("Lỗi ràng buộc duy nhất trong cơ sở dữ liệu");
        statusCode = statusCodes.BAD_REQUEST; // 400 hoặc có thể dùng 409 (CONFLICT)
    }

    const resData = responseError(err?.message, statusCode, err?.stack);
    res.status(resData.statusCode).json(resData);
};
