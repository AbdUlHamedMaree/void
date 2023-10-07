import { storage } from '$libs/mmkv';
import axios from 'axios';

export const request = axios.create({
  baseURL: 'http://192.168.1.63:3000', //API_BASE_URL,
  timeout: 4_000,
});

request.interceptors.request.use(
  config => {
    const accessToken = storage.accessToken.get();
    if (accessToken)
      config.headers.Authorization =
        config.headers.Authorization ?? `Bearer ${accessToken}`;

    return config;
  },
  err => Promise.reject(err)
);
