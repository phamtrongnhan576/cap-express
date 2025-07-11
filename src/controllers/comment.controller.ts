// controllers/comment.controller.ts
import { Request, Response } from "express";
import commentService from "../services/comment.service";
import { statusCodes } from "@/common/helpers/statusCode.helper";
import { CreateCommentDTO } from "@/common/dtos/comment.dto";
import { AuthRequest } from "@/common/middlewares/auth.middleware";
import {
    responseSuccess,
    responseError,
} from "@/common/helpers/response.helper";

const commentController = {
    getByImageId: async (req: Request, res: Response) => {
        try {
            const { imageId } = req.params;
            const result = await commentService.getByImageId(Number(imageId));

            const response = responseSuccess({
                data: result,
                message: "Lấy bình luận thành công",
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

    create: async (req: AuthRequest, res: Response) => {
        try {
            const commentData: CreateCommentDTO = req.body;
            const userId = req.user!.id; // Sửa từ userId thành id
            const result = await commentService.create(commentData, userId);

            const response = responseSuccess({
                data: result,
                message: "Tạo bình luận thành công",
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

    delete: async (req: AuthRequest, res: Response) => {
        try {
            const { id } = req.params;
            const userId = req.user!.id; // Sửa từ userId thành id
            await commentService.delete(Number(id), userId);

            const response = responseSuccess({
                message: "Xóa bình luận thành công",
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
    update: async (req: AuthRequest, res: Response) => {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const userId = req.user!.id;

            const result = await commentService.update(
                Number(id),
                userId,
                content
            );

            const response = responseSuccess({
                data: result,
                message: "Cập nhật bình luận thành công",
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
};

export default commentController;
