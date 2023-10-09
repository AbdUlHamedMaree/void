export * from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    __refreshTokenRequest?: boolean;
  }
}
