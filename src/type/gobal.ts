import { Key } from "react";

export type TError = {
    data: {
        message: string;
        stack: string;
        success: boolean;
    };
    status: number;
};

export type TMeta = {
    limit: number
    page: number
    total: number
    totalPage: number
}

export type TResponse<T> = {
    data?: T,
    error?: TError,
    meta: TMeta
}


export type TQueryParams = {
    name: string;
    value: boolean | Key;
};