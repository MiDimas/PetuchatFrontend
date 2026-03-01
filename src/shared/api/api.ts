import axios from 'axios';
import { authStorage } from '@/shared/lib/auth/authStorage';

export const $api = axios.create({
    baseURL: __API__,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        const token = authStorage.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;

            // Clear auth and redirect to start
            authStorage.clear();
            window.location.href = '/start';

            return Promise.reject(error);
        }

        return Promise.reject(error);
    },
);
