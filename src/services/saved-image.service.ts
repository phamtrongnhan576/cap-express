import prisma from "@/common/prisma/init.prisma";

export class SavedImageService {
    async saveImage(userId: number, imageId: number) {
        const existingSave = await prisma.saved_images.findFirst({
            where: {
                user_id: userId,
                image_id: imageId,
                is_deleted: false,
            },
        });

        if (existingSave) {
            throw new Error("Ảnh đã được lưu trước đó");
        }

        const image = await prisma.images.findFirst({
            where: {
                id: imageId,
                is_deleted: false,
            },
        });

        if (!image) {
            throw new Error("Ảnh không tồn tại");
        }

        return await prisma.saved_images.create({
            data: {
                user_id: userId,
                image_id: imageId,
            },
        });
    }

    async unsaveImage(userId: number, imageId: number): Promise<boolean> {
        const savedImage = await prisma.saved_images.findFirst({
            where: {
                user_id: userId,
                image_id: imageId,
                is_deleted: false,
            },
        });

        if (!savedImage) {
            return false;
        }

        await prisma.saved_images.update({
            where: { id: savedImage.id },
            data: {
                is_deleted: true,
                deleted_by: userId,
                deleted_at: new Date(),
            },
        });

        return true;
    }

    async checkSavedImage(userId: number, imageId: number): Promise<boolean> {
        const savedImage = await prisma.saved_images.findFirst({
            where: {
                user_id: userId,
                image_id: imageId,
                is_deleted: false,
            },
        });

        return !!savedImage;
    }

    async getUserSavedImages(userId: number) {
        return await prisma.saved_images.findMany({
            where: {
                user_id: userId,
                is_deleted: false,
            },
            include: {
                images: {
                    include: {
                        users: {
                            select: {
                                id: true,
                                full_name: true,
                                avatar_url: true,
                            },
                        },
                    },
                },
            },
            orderBy: { created_at: "desc" },
        });
    }
}
