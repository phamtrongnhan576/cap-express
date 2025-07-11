// common/dtos/user.dto.ts
export interface UpdateUserDTO {
    full_name?: string;
    age?: number;
    avatar_url?: string;
    password?: string;
}

export interface UserResponseDTO {
    id: number;
    email: string;
    full_name: string;
    age: number | null;
    avatar_url: string | null;
    created_at: Date;
}
