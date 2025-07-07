export type SuccessResponse<T = any> = {
    status: "success";
    statusCode: number;
    message: string;
    data: T | null;
    doc: string;
};

export type ErrorResponse = {
    status: "error";
    statusCode: number;
    message: string;
    stack?: string | null;
    doc: string;
};

export type ErrorOptions = {
    message?: string;
    statusCode?: number;
    stack?: string | null;
};

export type SuccessOptions<T = any> = {
    data?: T;
    message?: string;
    statusCode?: number;
};
