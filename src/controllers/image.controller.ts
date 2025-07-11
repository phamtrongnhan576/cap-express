import { Request, Response } from "express";
import { ImageService } from "@/services/image.service";
import { AuthRequest } from "@/common/middlewares/auth.middleware";
import {
    responseSuccess,
    responseError,
} from "@/common/helpers/response.helper";
import { statusCodes } from "@/common/helpers/statusCode.helper";

const imageController = {
    getAll: async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const result = await ImageService.getAllImages(page, limit);
        const response = responseSuccess({
            data: result,
            message: "Lấy danh sách ảnh thành công",
        });

        res.status(response.statusCode).json(response);
    },

    search: async (req: Request, res: Response) => {
        const title = req.query.title as string;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const result = await ImageService.searchImages(title, page, limit);
        const response = responseSuccess({
            data: result,
            message: "Tìm kiếm ảnh thành công",
        });

        res.status(response.statusCode).json(response);
    },

    getById: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const result = await ImageService.getImageById(id);

        if (!result) {
            const response = responseError({
                message: "Ảnh không tồn tại",
                statusCode: statusCodes.NOT_FOUND,
            });
            res.status(response.statusCode).json(response);
            return;
        }

        const response = responseSuccess({
            data: result,
            message: "Lấy chi tiết ảnh thành công",
        });

        res.status(response.statusCode).json(response);
    },

    create: async (req: AuthRequest, res: Response) => {
        const userId = req.user!.id;
        const result = await ImageService.createImage(userId, req.body);

        const response = responseSuccess({
            data: result,
            message: "Tạo ảnh thành công",
            statusCode: statusCodes.CREATED,
        });

        res.status(response.statusCode).json(response);
    },

    delete: async (req: AuthRequest, res: Response) => {
        const id = parseInt(req.params.id);
        const userId = req.user!.id;

        const deleted = await ImageService.deleteImage(id, userId);

        if (!deleted) {
            const response = responseError({
                message: "Không tìm thấy hoặc không có quyền xóa ảnh",
                statusCode: statusCodes.NOT_FOUND,
            });
            res.status(response.statusCode).json(response);
            return;
        }

        const response = responseSuccess({
            message: "Xóa ảnh thành công",
        });

        res.status(response.statusCode).json(response);
    },

    getByUser: async (req: AuthRequest, res: Response) => {
        const userId = req.user!.id;

        const images = await ImageService.getUserImages(userId);

        const response = responseSuccess({
            data: images,
            message: "Lấy danh sách ảnh của người dùng thành công",
        });

        res.status(response.statusCode).json(response);
    },
};

export default imageController;
