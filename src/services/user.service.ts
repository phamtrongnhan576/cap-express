import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { UpdateUserDTO } from "@/common/dtos/user.dto";

const prisma = new PrismaClient();

const userService = {
    getProfile: async (userId: number) => {
        const user = await prisma.users.findFirst({
            where: { id: userId, is_deleted: false },
            select: {
                id: true,
                email: true,
                full_name: true,
                age: true,
                avatar_url: true,
                created_at: true,
            },
        });

        if (!user) {
            throw new Error("Không tìm thấy người dùng");
        }

        return user;
    },

    updateProfile: async (userId: number, updateData: UpdateUserDTO) => {
        const { full_name, age, avatar_url, password } = updateData;

        let dataToUpdate: any = {
            full_name,
            age,
            avatar_url,
        };

        // Nếu có password mới, mã hóa nó
        if (password) {
            dataToUpdate.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.users.update({
            where: { id: userId },
            data: dataToUpdate,
            select: {
                id: true,
                email: true,
                full_name: true,
                age: true,
                avatar_url: true,
                created_at: true,
            },
        });

        return updatedUser;
    },

    getSavedImages: async (userId: number) => {
        const savedImages = await prisma.saved_images.findMany({
            where: { user_id: userId, is_deleted: false },
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

        return savedImages.map((item) => item.images);
    },

    getCreatedImages: async (userId: number) => {
        const createdImages = await prisma.images.findMany({
            where: { user_id: userId, is_deleted: false },
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

        return createdImages;
    },

    // Thống kê user
    getUserStats: async (userId: number) => {
        const [createdCount, savedCount, commentsCount] = await Promise.all([
            prisma.images.count({
                where: { user_id: userId, is_deleted: false },
            }),
            prisma.saved_images.count({
                where: { user_id: userId, is_deleted: false },
            }),
            prisma.comments.count({
                where: { user_id: userId, is_deleted: false },
            }),
        ]);

        return {
            created_images: createdCount,
            saved_images: savedCount,
            comments: commentsCount,
        };
    },
};

export default userService;
