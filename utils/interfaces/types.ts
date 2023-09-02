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
        limit?: number;
        total: number;
    };
    data?: T | null;
};

export interface IPaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: any;
};

export interface IPaginationOptionsResult {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: any;
};

export interface ILoginResponse {
    accessToken: string;
    user?: Partial<User>
}
