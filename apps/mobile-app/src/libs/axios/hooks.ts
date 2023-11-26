import { useCallback, useLayoutEffect } from 'react';
import { request } from './instance';
import { AxiosGraphQlResponse, isGraphQlErrorResponse } from './response';
import { AxiosGraphQlErrorResponseData, isGraphQlStandardError } from './error';
import { AxiosError } from 'axios';
import { getNewTokensRequest } from './get-new-tokens';
import { storage } from '$libs/mmkv';
import { useMeQuery } from '$apis/user';

export const useAxiosService = () => {
  useMeQuery();

  const errorInterceptor = useCallback(
    async (error: AxiosError<AxiosGraphQlErrorResponseData>) => {
      if (error?.code === '401') {
        const originalRequest = error.config!;
        if (!originalRequest.__refreshTokenRequest) {
          const newTokens = await getNewTokensRequest();

          storage.accessToken.set(newTokens.getNewTokens.accessToken);
          storage.refreshToken.set(newTokens.getNewTokens.refreshToken);

          originalRequest.headers.Authorization = newTokens.getNewTokens.accessToken;

          return request(originalRequest);
        }

        storage.accessToken.delete();
        storage.refreshToken.delete();
      }

      return Promise.reject(error);
    },
    []
  );

  useLayoutEffect(() => {
    const unsubscribeId = request.interceptors.response.use(
      (response: AxiosGraphQlResponse) => {
        if (isGraphQlErrorResponse(response)) {
          let statusCode: string;
          let message: string;

          const data = response.data;

          if (isGraphQlStandardError(data)) {
            const error = data.errors[0];
            statusCode = (error.extensions?.response?.statusCode ?? 400) + '';
            message = error.message;
          } else {
            const error = data.error.errors[0];
            statusCode = '400';
            message = error.message;
          }

          const error = new AxiosError(
            message,
            statusCode,
            response.config,
            response.request,
            response
          );

          return errorInterceptor(error);
        }

        return response;
      },
      async err => errorInterceptor(err)
    );

    return () => {
      request.interceptors.response.eject(unsubscribeId);
    };
  }, [errorInterceptor]);
};
