import { CreateImageDTO } from "@/common/dtos/image.dto";
import prisma from "@/common/prisma/init.prisma";

export const ImageService = {
    async getAllImages(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;

        const [images, total] = await Promise.all([
            prisma.images.findMany({
                where: { is_deleted: false },
                include: {
                    users: {
                        select: {
                            id: true,
                            full_name: true,
                            avatar_url: true,
                        },
                    },
                    _count: {
                        select: {
                            comments: {
                                where: { is_deleted: false },
                            },
                            saved_images: {
                                where: { is_deleted: false },
                            },
                        },
                    },
                },
                orderBy: { created_at: "desc" },
                skip,
                take: limit,
            }),
            prisma.images.count({
                where: { is_deleted: false },
            }),
        ]);

        return {
            images,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    },

    async searchImages(title: string, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;

        const [images, total] = await Promise.all([
            prisma.images.findMany({
                where: {
                    is_deleted: false,
                    title: {
                        contains: title,
                    },
                },
                include: {
                    users: {
                        select: {
                            id: true,
                            full_name: true,
                            avatar_url: true,
                        },
                    },
                    _count: {
                        select: {
                            comments: {
                                where: { is_deleted: false },
                            },
                            saved_images: {
                                where: { is_deleted: false },
                            },
                        },
                    },
                },
                orderBy: { created_at: "desc" },
                skip,
                take: limit,
            }),
            prisma.images.count({
                where: {
                    is_deleted: false,
                    title: {
                        contains: title,
                    },
                },
            }),
        ]);

        return {
            images,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    },

    async getImageById(id: number) {
        return await prisma.images.findFirst({
            where: {
                id,
                is_deleted: false,
            },
            include: {
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    },
                },
                _count: {
                    select: {
                        comments: {
                            where: { is_deleted: false },
                        },
                        saved_images: {
                            where: { is_deleted: false },
                        },
                    },
                },
            },
        });
    },

    async createImage(userId: number, imageData: CreateImageDTO) {
        return await prisma.images.create({
            data: {
                title: imageData.title,
                url: imageData.url,
                description: imageData.description || null,
                user_id: userId,
            },
        });
    },

    async deleteImage(id: number, userId: number): Promise<boolean> {
        const image = await prisma.images.findFirst({
            where: {
                id,
                user_id: userId,
                is_deleted: false,
            },
        });

        if (!image) {
            return false;
        }

        await prisma.images.update({
            where: { id },
            data: {
                is_deleted: true,
                deleted_by: userId,
                deleted_at: new Date(),
            },
        });

        return true;
    },

    async getUserImages(userId: number) {
        return await prisma.images.findMany({
            where: {
                user_id: userId,
                is_deleted: false,
            },
            include: {
                _count: {
                    select: {
                        comments: {
                            where: { is_deleted: false },
                        },
                        saved_images: {
                            where: { is_deleted: false },
                        },
                    },
                },
            },
            orderBy: { created_at: "desc" },
        });
    },
};
export default ImageService;
