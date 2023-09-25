import { User } from "@prisma/client";

export type IErrorMessage = {
    path: string | number;
    message: string;
};

export type IErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IErrorMessage[];
};

export interface IApiReponse<T> {
    statusCode: number;
    success: boolean;
    message?: string | null;
    meta?: {
        page?: number;
        size?: number;
        total: number;
        totalPage?: number;
    };
    data?: T | null;
    token?: string | null;
};

export interface IPaginationOptions {
    page?: number;
    size?: number;
    sortBy?: string;
    sortOrder?: any;
};

export interface IPaginationOptionsResult {
    page: number;
    size: number;
    skip: number;
    sortBy: string;
    sortOrder: any;
};

export interface ILoginResponse {
    accessToken: string;
    user?: Partial<User>
}
