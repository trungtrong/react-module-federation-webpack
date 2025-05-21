/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnvironmentHelper } from '../environments';
import BaseService from './BaseService';

export const ApiService = {
    getApiBaseUrl() {
        return EnvironmentHelper.environment.API_BASE_URL;
    },

    get<T>(params: {
        url: string;
        queryParams?: Record<string, any>;
    }): Promise<T> {
        console.log('ApiService', EnvironmentHelper.environment);
        return BaseService.getInstance().get<T>(
            `${this.getApiBaseUrl()}/${params.url}`,
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
        return BaseService.getInstance().post<T>(
            `${this.getApiBaseUrl()}/${params.url}`,
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
        return BaseService.getInstance().put<T>(
            `${this.getApiBaseUrl()}/${params.url}`,
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
        return BaseService.getInstance().delete<T>(
            `${this.getApiBaseUrl()}/${params.url}`,
            {
                params: params?.queryParams,
            }
        )
            .then((response) => response as T)
            .catch((error) => Promise.reject(new Error(error))) as Promise<T>;
    },
};
