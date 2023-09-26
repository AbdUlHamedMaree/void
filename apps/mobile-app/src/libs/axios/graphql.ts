/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosRequestConfig } from 'axios';
import { request } from './instance';
import { resolveRequestDocument, type RequestDocument } from 'graphql-request';
import { type TypedDocumentNode } from '@graphql-typed-document-node/core';

export type GraphQlRequestAxiosConfig = Omit<
  AxiosRequestConfig,
  'data' | 'url' | 'method'
>;

export const graphqlRequest = <TResult extends object, TVariables = Record<string, any>>(
  document: RequestDocument | TypedDocumentNode<TResult, TVariables>,
  ...[variables, config]: TVariables extends Record<string, any>
    ? [TVariables, GraphQlRequestAxiosConfig?]
    : [TVariables?, GraphQlRequestAxiosConfig?]
) =>
  request
    .post<TResult>(
      'graphql',
      {
        ...resolveRequestDocument(document),
        variables: variables,
      },
      config
    )
    .then(res => {
      if ((res.data as any).errors) return Promise.reject((res.data as any).errors);

      return (res.data as any).data;
    });
