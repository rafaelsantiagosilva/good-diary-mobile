import axios, { AxiosRequestConfig, Method } from "axios";
import { tokenStore } from "./api/token-store";

export const AXIOS_INSTANCE = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 10_000
});

export const customInstance = async<T>(
    url: string,
    options: {
        method: string;
        headers?: Record<string, string>;
        body?: string;
        signal?: AbortSignal
    }
): Promise<T> => {
    const token = await tokenStore.getToken();

    const headers: Record<string, string> = {
        ...options.headers,
    };

    if (token)
        headers["Authorization"] = `Bearer ${token}`;

    const axiosConfig: AxiosRequestConfig = {
        url,
        method: options.method as Method,
        headers,
        data: options.body ? JSON.parse(options.body) : undefined,
        signal: options.signal
    };

    try {
        const response = await AXIOS_INSTANCE(axiosConfig);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401)
            tokenStore.clearToken();

        return Promise.reject(error);
    }
}