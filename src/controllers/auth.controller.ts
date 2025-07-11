// controllers/auth.controller.ts
import { Request, Response } from "express";
import authService from "../services/auth.service";
import { statusCodes } from "@/common/helpers/statusCode.helper";
import { RegisterDTO, LoginDTO } from "@/common/dtos/auth.dto";
import {
    responseSuccess,
    responseError,
} from "@/common/helpers/response.helper";

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const registerData: RegisterDTO = req.body;
            const user = await authService.register(registerData);

            const response = responseSuccess({
                data: user,
                message: "Đăng ký thành công",
                statusCode: statusCodes.CREATED,
            });

            res.status(response.statusCode).json(response);
        } catch (error: any) {
            const response = responseError({
                message: error.message,
                statusCode: statusCodes.BAD_REQUEST,
            });

            res.status(response.statusCode).json(response);
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const loginData: LoginDTO = req.body;
            const result = await authService.login(loginData);

            const response = responseSuccess({
                data: result,
                message: "Đăng nhập thành công",
                statusCode: statusCodes.OK,
            });

            res.status(response.statusCode).json(response);
        } catch (error: any) {
            const response = responseError({
                message: error.message,
                statusCode: statusCodes.UNAUTHORIZED,
            });

            res.status(response.statusCode).json(response);
        }
    },
};

export default authController;
