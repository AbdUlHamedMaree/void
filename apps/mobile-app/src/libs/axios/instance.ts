import { storage } from '$libs/mmkv';
import axios from 'axios';

export const request = axios.create({
  baseURL: 'http://192.168.1.63:3000',
});

request.interceptors.request.use(
  config => {
    const accessToken = storage.accessToken.get();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  err => Promise.reject(err)
);

// Response interceptor for API calls
request.interceptors.response.use(
  res => res,
  async error => {
    if (!axios.isAxiosError(error)) return Promise.reject(error);

    const originalRequest = error.config!;
    if (error.response?.status === 403 && !(originalRequest as any)._retry) {
      (originalRequest as any)._retry = true;
      const accessToken = 'bad-token'; //await refreshAccessToken();

      storage.accessToken.set(accessToken);
      storage.refreshToken.set(accessToken);

      return request(originalRequest);
    }
    return Promise.reject(error);
  }
);
