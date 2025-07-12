// services/comment.service.ts
import { PrismaClient } from "@prisma/client";
import { CreateCommentDTO } from "@/common/dtos/comment.dto";

const prisma = new PrismaClient();

const commentService = {
    getByImageId: async (imageId: number) => {
        const comments = await prisma.comments.findMany({
            where: { image_id: imageId, is_deleted: false },
            include: {
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    },
                },
            },
            orderBy: { created_at: "desc" },
        });

        return comments;
    },

    create: async (commentData: CreateCommentDTO, userId: number) => {
        const { image_id, content } = commentData;

        const newComment = await prisma.comments.create({
            data: {
                user_id: userId,
                image_id,
                content,
            },
            include: {
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    },
                },
            },
        });

        return newComment;
    },
    update: async (id: number, userId: number, content: string) => {
        const comment = await prisma.comments.findFirst({
            where: { id, user_id: userId, is_deleted: false },
        });

        if (!comment) {
            throw new Error(
                "Không tìm thấy bình luận hoặc bạn không có quyền sửa"
            );
        }

        const updatedComment = await prisma.comments.update({
            where: { id },
            data: { content },
            include: {
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    },
                },
            },
        });

        return updatedComment;
    },
    delete: async (id: number, userId: number) => {
        const comment = await prisma.comments.findFirst({
            where: { id, user_id: userId, is_deleted: false },
        });

        if (!comment) {
            throw new Error(
                "Không tìm thấy bình luận hoặc bạn không có quyền xóa"
            );
        }

        await prisma.comments.update({
            where: { id },
            data: {
                is_deleted: true,
                deleted_by: userId,
                deleted_at: new Date(),
            },
        });
    },
};

export default commentService;
