import { CreateImageDTO } from "@/common/dtos/image.dto";
import prisma from "@/common/prisma/init.prisma";
import { v2 as cloudinary } from 'cloudinary';
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

    // Sửa lại hàm createImage để hỗ trợ cả file upload và URL
    async createImage(
        userId: number,
        imageData: CreateImageDTO,
        file?: Express.Multer.File
    ) {
        let imageUrl = imageData.url;
        let cloudinaryPublicId = null;

        // Nếu có file thì upload lên Cloudinary
        if (file) {
            try {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "pinterest-app",
                    resource_type: "image",
                    transformation: [
                        {
                            width: 1200,
                            height: 800,
                            crop: "limit",
                            quality: "auto",
                        },
                    ],
                });

                imageUrl = result.secure_url;
                cloudinaryPublicId = result.public_id;
            } catch (error) {
                throw new Error("Upload ảnh lên Cloudinary thất bại");
            }
        }

        // Kiểm tra phải có URL hoặc file
        if (!imageUrl && !file) {
            throw new Error("Phải có URL ảnh hoặc file upload");
        }

        // Lưu vào database
        return await prisma.images.create({
            data: {
                title: imageData.title,
                url: imageUrl,
                description: imageData.description || null,
                user_id: userId,
                cloudinary_public_id: cloudinaryPublicId,
            },
        });
    },

    // Sửa lại hàm deleteImage để xóa cả trên Cloudinary
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

        // Xóa trên Cloudinary nếu có public_id
        if (image.cloudinary_public_id) {
            try {
                await cloudinary.uploader.destroy(image.cloudinary_public_id);
            } catch (error) {
                console.error("Xóa ảnh trên Cloudinary thất bại:", error);
            }
        }

        // Soft delete trong database
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
