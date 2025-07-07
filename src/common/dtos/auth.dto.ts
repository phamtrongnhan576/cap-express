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

export interface LoginResponseDTO {
    message: string;
    token: string;
    user: {
        id: number;
        email: string;
        full_name: string;
    };
}
