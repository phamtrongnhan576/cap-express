import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import prisma from "@/common/prisma/init.prisma";
import { JWT } from "@/common/constants/init.constants";
import {
    RegisterDTO,
    LoginDTO,
    LoginResponseDTO,
} from "@/common/dtos/auth.dto";

export class AuthService {
    async register(registerData: RegisterDTO) {
        const { email, password, full_name, age } = registerData;

        const existingUser = await prisma.users.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new Error("Email đã được sử dụng");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const user = await prisma.users.create({
            data: {
                email,
                password: hashedPassword,
                full_name,
                age: age || null,
            },
        });

        return {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
        };
    }

    async login(loginData: LoginDTO): Promise<LoginResponseDTO> {
        const { email, password } = loginData;

        // Tìm user
        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error("Email hoặc mật khẩu không đúng");
        }

        // Kiểm tra password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new Error("Email hoặc mật khẩu không đúng");
        }

        // Tạo token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT.SECRET as Secret, // ép kiểu đúng yêu cầu của thư viện
            {
                expiresIn: JWT.EXPIRES_IN as string, // hoặc đơn giản là `as string`
            }
        );

        return {
            message: "Đăng nhập thành công",
            token,
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
            },
        };
    }
}
