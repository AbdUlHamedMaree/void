import { useCallback, useLayoutEffect } from 'react';
import { request } from './instance';
import { AxiosGraphQlResponse, isGraphQlErrorResponse } from './response';
import { AxiosGraphQlErrorResponseData, isGraphQlStandardError } from './error';
import { AxiosError } from 'axios';
import { getNewTokensRequest } from './get-new-tokens';
import { storage } from '$libs/mmkv';
import { useSetAtom } from 'jotai';
import { userAtom } from '$atoms/user';

export const useAxiosService = () => {
  const setUser = useSetAtom(userAtom);

  const errorInterceptor = useCallback(
    async (error: AxiosError<AxiosGraphQlErrorResponseData>) => {
      if (error?.code === '401') {
        const originalRequest = error.config!;
        if (!(originalRequest as any)._retry) {
          (originalRequest as any)._retry = true;
          const newTokens = await getNewTokensRequest();

          storage.accessToken.set(newTokens.getNewTokens.accessToken);
          storage.refreshToken.set(newTokens.getNewTokens.refreshToken);

          return request(originalRequest);
        }

        storage.accessToken.delete();
        storage.refreshToken.delete();
        setUser(null);
      }

      return Promise.reject(error);
    },
    [setUser]
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
      async err => Promise.reject(err)
    );

    return () => {
      request.interceptors.response.eject(unsubscribeId);
    };
  }, [errorInterceptor]);
};
