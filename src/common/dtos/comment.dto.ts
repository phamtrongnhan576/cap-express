// common/dtos/comment.dto.ts
export interface CreateCommentDTO {
    image_id: number;
    content: string;
}

export interface CommentResponseDTO {
    id: number;
    content: string;
    user_id: number;
    image_id: number;
    users?: {
        id: number;
        full_name: string;
        avatar_url: string | null;
    };
    created_at: Date;
    updated_at: Date;
}
