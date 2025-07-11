import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import prisma from "@/common/prisma/init.prisma";
import { JWT } from "@/common/constants/init.constants";
import { RegisterDTO, LoginDTO } from "@/common/dtos/auth.dto";
import { BadrequestException } from "@/common/helpers/exception.helper";

export const authService = {
    async register(registerData: RegisterDTO) {
        const { email, password, full_name, age } = registerData;

        const existingUser = await prisma.users.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new BadrequestException("Email đã được sử dụng");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
            data: {
                email,
                password: hashedPassword,
                full_name,
                age: age || null,
                created_at: new Date(),
                updated_at: new Date(),
                is_deleted: false,
                deleted_by: 0,
                deleted_at: null,
            },
        });

        return {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
        };
    },

    async login(loginData: LoginDTO) {
        const { email, password } = loginData;

        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user) {
            throw new BadrequestException("Email hoặc mật khẩu không đúng");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new BadrequestException("Email hoặc mật khẩu không đúng");
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT.SECRET, {
            expiresIn: JWT.EXPIRES_IN,
        } as SignOptions);

        return {
            message: "Đăng nhập thành công",
            token,
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
            },
        };
    },
};

export default authService;
