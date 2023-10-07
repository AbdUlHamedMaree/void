/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosRequestConfig } from 'axios';
import { request } from './instance';
import { resolveRequestDocument, type RequestDocument, Variables } from 'graphql-request';
import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { AxiosGraphQlSuccessResponse } from './response';
import { RemoveIndex } from 'graphql-request/build/esm/helpers';

export type GraphQlRequestAxiosConfig = Omit<
  AxiosRequestConfig,
  'data' | 'url' | 'method'
>;

export const graphqlRequest = <TResult, TVariables = Variables>(
  document: RequestDocument | TypedDocumentNode<TResult, TVariables>,
  ...[variables, config]: TVariables extends Record<any, never>
    ? [undefined?, GraphQlRequestAxiosConfig?]
    : keyof RemoveIndex<TVariables> extends never
    ? [undefined?, GraphQlRequestAxiosConfig?]
    : [TVariables, GraphQlRequestAxiosConfig?]
): Promise<TResult> =>
  request
    .post<any, AxiosGraphQlSuccessResponse<TResult>>(
      'graphql',
      {
        ...resolveRequestDocument(document),
        variables: variables,
      },
      config
    )
    .then(res => {
      return res.data.data;
    });
