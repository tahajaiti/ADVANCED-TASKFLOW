import axios, { AxiosResponse } from 'axios';
import ApiResponse from '@/types/api';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse<ApiResponse<any>> => {
        const customResponse: AxiosResponse<ApiResponse<any>> = {
            ...response,
            data: response.data as ApiResponse<any>,
        };
        return customResponse;
    },
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;
