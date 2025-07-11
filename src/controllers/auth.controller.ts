import { Request, Response } from "express";
import authService from "../services/auth.service";
import { statusCodes } from "@/common/helpers/statusCode.helper";
import { RegisterDTO, LoginDTO } from "@/common/dtos/auth.dto";

const authController = {
    register: async (req: Request, res: Response) => {
        const registerData: RegisterDTO = req.body;
        const user = await authService.register(registerData);
        res.status(statusCodes.CREATED).json({
            message: "Đăng ký thành công",
            user,
        });
    },

    login: async (req: Request, res: Response) => {
        const loginData: LoginDTO = req.body;
        const result = await authService.login(loginData);
        res.status(statusCodes.OK).json(result);
    },
};

export default authController;
