/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosResponse } from 'axios';
import { AxiosGraphQlErrorResponseData, isGraphQlError } from './error';

export type AxiosGraphQlSuccessResponseData<TData = any> = {
  data: TData;
};

export type AxiosGraphQlSuccessResponse<TData = any, TBody = any> = AxiosResponse<
  AxiosGraphQlSuccessResponseData<TData>,
  TBody
>;

export type AxiosGraphQlErrorResponse<TBody = any> = AxiosResponse<
  AxiosGraphQlErrorResponseData,
  TBody
>;

export type AxiosGraphQlResponse<TData = any, TBody = any> = AxiosResponse<
  AxiosGraphQlSuccessResponseData<TData> | AxiosGraphQlErrorResponseData,
  TBody
>;

export const isGraphQlErrorResponse = (
  response: AxiosGraphQlResponse
): response is AxiosGraphQlErrorResponse => isGraphQlError(response.data);

export const isGraphQlSuccessResponse = (
  response: AxiosGraphQlResponse
): response is AxiosGraphQlSuccessResponse => !isGraphQlErrorResponse(response);
