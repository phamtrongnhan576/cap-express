// controllers/user.controller.ts
import { Request, Response } from "express";
import userService from "../services/user.service";
import { statusCodes } from "@/common/helpers/statusCode.helper";
import { UpdateUserDTO } from "@/common/dtos/user.dto";
import { AuthRequest } from "@/common/middlewares/auth.middleware";
import {
    responseSuccess,
    responseError,
} from "@/common/helpers/response.helper";

const userController = {
    getProfile: async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user!.id; // Sửa từ userId thành id
            const result = await userService.getProfile(userId);

            const response = responseSuccess({
                data: result,
                message: "Lấy thông tin profile thành công",
            });

            res.status(response.statusCode).json(response);
        } catch (error: any) {
            const response = responseError({
                message: error.message,
                statusCode: statusCodes.NOT_FOUND,
            });

            res.status(response.statusCode).json(response);
        }
    },

    updateProfile: async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user!.id; // Sửa từ userId thành id
            const updateData: UpdateUserDTO = req.body;
            const result = await userService.updateProfile(userId, updateData);

            const response = responseSuccess({
                data: result,
                message: "Cập nhật thông tin thành công",
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

    getSavedImages: async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user!.id; // Sửa từ userId thành id
            const result = await userService.getSavedImages(userId);

            const response = responseSuccess({
                data: result,
                message: "Lấy danh sách ảnh đã lưu thành công",
            });

            res.status(response.statusCode).json(response);
        } catch (error: any) {
            const response = responseError({
                message: error.message,
                statusCode: statusCodes.INTERNAL_SERVER_ERROR,
            });

            res.status(response.statusCode).json(response);
        }
    },

    getCreatedImages: async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user!.id; // Sửa từ userId thành id
            const result = await userService.getCreatedImages(userId);

            const response = responseSuccess({
                data: result,
                message: "Lấy danh sách ảnh đã tạo thành công",
            });

            res.status(response.statusCode).json(response);
        } catch (error: any) {
            const response = responseError({
                message: error.message,
                statusCode: statusCodes.INTERNAL_SERVER_ERROR,
            });

            res.status(response.statusCode).json(response);
        }
    },

    getUserStats: async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user!.id; // Sửa từ userId thành id
            const result = await userService.getUserStats(userId);

            const response = responseSuccess({
                data: result,
                message: "Lấy thống kê user thành công",
            });

            res.status(response.statusCode).json(response);
        } catch (error: any) {
            const response = responseError({
                message: error.message,
                statusCode: statusCodes.INTERNAL_SERVER_ERROR,
            });

            res.status(response.statusCode).json(response);
        }
    },
};

export default userController;
