import { CreateImageDTO } from "@/common/dtos/image.dto";
import { BadrequestException } from "@/common/helpers/exception.helper";
import prisma from "@/common/prisma/init.prisma";

export const ImageService = {
    async getAll(page: number = 1, limit: number = 10) {
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

    async search(title: string, page: number = 1, limit: number = 10) {
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

    async getById(id: number) {
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

    async create(
        userId: number,
        imageData: CreateImageDTO,
        file?: Express.Multer.File
    ) {
        let imageUrl = imageData.url;

        if (file) {
            imageUrl = file.path;
        }

        if (!imageUrl && !file) {
            throw new BadrequestException("Phải có URL ảnh hoặc file upload");
        }

        return await prisma.images.create({
            data: {
                title: imageData.title,
                url: imageUrl,
                description: imageData.description || null,
                user_id: userId,
            },
        });
    },

    async edit(
        imageId: number,
        userId: number,
        imageData: { description?: string },
        file?: Express.Multer.File
    ) {
        const image = await prisma.images.findFirst({
            where: {
                id: imageId,
                user_id: userId,
                is_deleted: false,
            },
        });

        if (!image) {
            throw new BadrequestException(
                "Không tìm thấy ảnh hoặc bạn không có quyền chỉnh sửa"
            );
        }

        const dataToUpdate: any = {
            updated_at: new Date(),
        };

        if (imageData.description !== undefined) {
            dataToUpdate.description = imageData.description;
        }

        if (file) {
            dataToUpdate.url = file.path; // Cập nhật URL mới
        }

        return await prisma.images.update({
            where: { id: imageId },
            data: dataToUpdate,
            select: {
                id: true,
                title: true,
                url: true,
                description: true,
                user_id: true,
                created_at: true,
                updated_at: true,
            },
        });
    },

    async delete(id: number, userId: number): Promise<boolean> {
        const image = await prisma.images.findFirst({
            where: {
                id,
                user_id: userId,
                is_deleted: false,
            },
        });

        if (!image) {
            throw new BadrequestException("Không tìm thấy ảnh");
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
    async getUser(userId: number) {
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
