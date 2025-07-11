// controllers/saved-image.controller.ts
import { Response } from "express";
import SavedImageService from "../services/saved-image.service";
import { AuthRequest } from "@/common/middlewares/auth.middleware";
import {
    responseSuccess,
    responseError,
} from "@/common/helpers/response.helper";
import { statusCodes } from "@/common/helpers/statusCode.helper";

const savedImageController = {
    save: async (req: AuthRequest, res: Response) => {
        try {
            const { imageId } = req.params;
            const userId = req.user!.id;

            const result = await SavedImageService.save(
                userId,
                parseInt(imageId)
            );

            const response = responseSuccess({
                data: result,
                message: "Lưu ảnh thành công",
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

    unSave: async (req: AuthRequest, res: Response) => {
        try {
            const { imageId } = req.params;
            const userId = req.user!.id;

            const isUnsaved = await SavedImageService.unSave(
                userId,
                parseInt(imageId)
            );

            if (!isUnsaved) {
                const response = responseError({
                    message: "Ảnh chưa được lưu hoặc không tồn tại",
                    statusCode: statusCodes.NOT_FOUND,
                });
                res.status(response.statusCode).json(response);
                return;
            }

            const response = responseSuccess({
                message: "Bỏ lưu ảnh thành công",
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

    checkSaved: async (req: AuthRequest, res: Response) => {
        try {
            const { imageId } = req.params;
            const userId = req.user!.id;

            const isSaved = await SavedImageService.checkSaved(
                userId,
                parseInt(imageId)
            );

            const response = responseSuccess({
                data: { is_saved: isSaved },
                message: "Kiểm tra trạng thái lưu ảnh thành công",
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

    UserSaved: async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user!.id;

            const savedImages = await SavedImageService.UserSaved(userId);

            const response = responseSuccess({
                data: savedImages,
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
};

export default savedImageController;
