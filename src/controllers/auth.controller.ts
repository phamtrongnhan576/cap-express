import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { statusCodes } from "@/common/helpers/statusCode.helper";
import { RegisterDTO, LoginDTO } from "@/common/dtos/auth.dto";

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
    try {
        const registerData: RegisterDTO = req.body;

        const user = await authService.register(registerData);

        res.status(statusCodes.CREATED).json({
            message: "Đăng ký thành công",
            user,
        });
    } catch (error: any) {
        res.status(statusCodes.BAD_REQUEST).json({
            message: error.message || "Lỗi server",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const loginData: LoginDTO = req.body;

        const result = await authService.login(loginData);

        res.status(statusCodes.OK).json(result);
    } catch (error: any) {
        res.status(statusCodes.BAD_REQUEST).json({
            message: error.message || "Lỗi server",
        });
    }
};
