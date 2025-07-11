export interface RegisterDTO {
    email: string;
    password: string;
    full_name: string;
    age?: number;
}

export interface LoginDTO {
    email: string;
    password: string;
}

