/* eslint-disable @typescript-eslint/no-explicit-any */
import environment from '../environments';
import BaseService from './BaseService';

export const ApiService = {
    get<T>(params: {
        url: string;
        queryParams?: Record<string, any>;
    }): Promise<T> {
        return BaseService.get<T>(
            `${environment.ENV_API_BASE_URL}/${params.url}`,
            {
                params: params?.queryParams,
            }
        )
            .then((response) => response as T)
            .catch((error) => Promise.reject(new Error(error))) as Promise<T>;
    },

    post<T>(params: {
        url: string;
        data?: any;
        queryParams?: Record<string, any>;
    }): Promise<T> {
        return BaseService.post<T>(
            `${environment.ENV_API_BASE_URL}/${params.url}`,
            params.data,
            { params: params?.queryParams }
        )
            .then((response) => response as T)
            .catch((error) => Promise.reject(new Error(error))) as Promise<T>;
    },

    put<T>(params: {
        url: string;
        data?: any;
        queryParams?: Record<string, any>;
    }): Promise<T> {
        return BaseService.put<T>(
            `${environment.ENV_API_BASE_URL}/${params.url}`,
            params.data,
            { params: params?.queryParams }
        )
            .then((response) => response as T)
            .catch((error) => Promise.reject(new Error(error))) as Promise<T>;
    },

    delete<T>(params: {
        url: string;
        queryParams?: Record<string, any>;
    }): Promise<T> {
        return BaseService.delete<T>(
            `${environment.ENV_API_BASE_URL}/${params.url}`,
            {
                params: params?.queryParams,
            }
        )
            .then((response) => response as T)
            .catch((error) => Promise.reject(new Error(error))) as Promise<T>;
    },
};
