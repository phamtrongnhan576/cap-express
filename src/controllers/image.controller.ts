import ImageService from "@/services/image.service";
import { responseSuccess } from "@/common/helpers/response.helper";
import { BadrequestException } from "@/common/helpers/exception.helper";
import { Response, NextFunction } from "express";
import { AuthRequest } from "@/common/middlewares/auth.middleware";

const imageController = {
    getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const result = await ImageService.getAll(page, limit);
            const response = responseSuccess({
                data: result,
                message: "Lấy danh sách ảnh thành công",
            });
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    },

    search: async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const title = req.query.title as string;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            if (!title) {
                throw new BadrequestException("Yêu cầu tiêu đề để tìm kiếm");
            }

            const result = await ImageService.search(title, page, limit);
            const response = responseSuccess({
                data: result,
                message: "Tìm kiếm ảnh thành công",
            });
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    },

    getById: async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const imageId = parseInt(req.params.id);
            if (isNaN(imageId)) {
                throw new BadrequestException("ID ảnh không hợp lệ");
            }

            const result = await ImageService.getById(imageId);
            if (!result) {
                throw new BadrequestException("Không tìm thấy ảnh");
            }

            const response = responseSuccess({
                data: result,
                message: "Lấy thông tin ảnh thành công",
            });
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    },

    create: async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new BadrequestException("Yêu cầu xác thực người dùng");
            }

            const imageData = {
                title: req.body.title,
                description: req.body.description,
                url: req.body.url,
            };
            const file = req.file;

            const result = await ImageService.create(userId, imageData, file);
            const response = responseSuccess({
                data: result,
                message: "Tạo ảnh thành công",
            });
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    },

    edit: async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const imageId = parseInt(req.params.id);
            if (isNaN(imageId)) {
                throw new BadrequestException("ID ảnh không hợp lệ");
            }

            const userId = req.user?.id;
            if (!userId) {
                throw new BadrequestException("Yêu cầu xác thực người dùng");
            }

            const imageData = {
                description: req.body.description,
            };
            const file = req.file;

            const result = await ImageService.edit(
                imageId,
                userId,
                imageData,
                file
            );
            const response = responseSuccess({
                data: result,
                message: "Cập nhật ảnh thành công",
            });
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const imageId = parseInt(req.params.id);
            if (isNaN(imageId)) {
                throw new BadrequestException("ID ảnh không hợp lệ");
            }

            const userId = req.user?.id;
            if (!userId) {
                throw new BadrequestException("Yêu cầu xác thực người dùng");
            }

            const result = await ImageService.delete(imageId, userId);
            const response = responseSuccess({
                data: result,
                message: `Xóa ảnh #${imageId} thành công`,
            });
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    },

    getUser: async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = parseInt(req.params.userId);
            if (isNaN(userId)) {
                throw new BadrequestException("ID người dùng không hợp lệ");
            }

            const result = await ImageService.getUser(userId);
            const response = responseSuccess({
                data: result,
                message: "Lấy danh sách ảnh của người dùng thành công",
            });
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    },
};

export default imageController;
