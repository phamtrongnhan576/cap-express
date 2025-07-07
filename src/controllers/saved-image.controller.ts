import { Response } from "express";
import { SavedImageService } from "../services/saved-image.service";
import { AuthRequest } from "@/common/middlewares/auth.middleware";
import { statusCodes } from "@/common/helpers/statusCode.helper";

const savedImageService = new SavedImageService();

export const saveImage = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { imageId } = req.params;
        const userId = req.user!.id;

        const savedImage = await savedImageService.saveImage(
            userId,
            parseInt(imageId)
        );

        res.status(statusCodes.CREATED).json({
            message: "Lưu ảnh thành công",
            data: savedImage,
        });
    } catch (error: any) {
        res.status(statusCodes.BAD_REQUEST).json({
            message: error.message || "Lỗi server",
        });
    }
};

export const unsaveImage = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { imageId } = req.params;
        const userId = req.user!.id;

        const isUnsaved = await savedImageService.unsaveImage(
            userId,
            parseInt(imageId)
        );

        if (!isUnsaved) {
            res.status(statusCodes.NOT_FOUND).json({
                message: "Ảnh chưa được lưu hoặc không tồn tại",
            });
            return;
        }

        res.status(statusCodes.OK).json({
            message: "Bỏ lưu ảnh thành công",
        });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Lỗi server",
        });
    }
};
export const checkSavedImage = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { imageId } = req.params;
        const userId = req.user!.id;

        const isSaved = await savedImageService.checkSavedImage(
            userId,
            parseInt(imageId)
        );

        res.status(statusCodes.OK).json({
            message: "Kiểm tra trạng thái lưu ảnh thành công",
            is_saved: isSaved,
        });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Lỗi server",
        });
    }
};

export const getUserSavedImages = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user!.id;

        const savedImages = await savedImageService.getUserSavedImages(userId);

        res.status(statusCodes.OK).json({
            message: "Lấy danh sách ảnh đã lưu thành công",
            data: savedImages,
        });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Lỗi server",
        });
    }
};
