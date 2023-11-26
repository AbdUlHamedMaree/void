import { storage } from '$libs/mmkv';
import { API_HTTP_PROTOCOL, API_HOST } from '@env';
import axios from 'axios';

export const request = axios.create({
  baseURL: API_HTTP_PROTOCOL + '//' + API_HOST,
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
