import axios, { AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000",
    timeout: 10_000
});

export const customInstance = async <T>(config: AxiosRequestConfig): Promise<T> => {
    /* TODO: use a context to get the jwt token
        if (token)
            config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
    */

    try {
        const response = await AXIOS_INSTANCE(config);
        return response.data;
    } catch (error) {
        return await Promise.reject(error);
    }
};