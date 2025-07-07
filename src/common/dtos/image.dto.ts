export interface CreateImageDTO {
    title: string;
    url: string;
    description?: string;
}

export interface UpdateImageDTO {
    title?: string;
    url?: string;
    description?: string;
}

export interface ImageWithUserDTO {
    id: number;
    title: string;
    url: string;
    description: string | null;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    users: {
        id: number;
        full_name: string;
        avatar_url: string | null;
    };
}
