import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT } from "../constants/init.constants";
import { statusCodes } from "../helpers/statusCode.helper";

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}

export const authenticateToken = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader?.split(" ")[1];

        if (!token) {
            res.status(statusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Token không được cung cấp",
            });
            return;
        }

        const decoded = jwt.verify(token, JWT.SECRET) as {
            id: number;
            email: string;
        };
        req.user = decoded;
        next();
    } catch (err) {
        res.status(statusCodes.FORBIDDEN).json({
            success: false,
            message: "Token không hợp lệ",
        });
    }
};
