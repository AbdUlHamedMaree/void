import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { UseGraphQLQueryReturn, useGraphQLQuery } from './use-graphql-query';
import { UseQueryOptions } from '@tanstack/react-query';
import { GraphQlRequestAxiosConfig } from '$libs/axios/graphql';
import { RemoveIndex } from 'graphql-request/build/esm/helpers';

export type CreateGraphQlQueryReturn<
  TData,
  TVariables,
  TKey extends unknown[] = [string, TVariables],
  THookOptions = Omit<
    UseQueryOptions<TData, unknown, TData, TKey>,
    'queryKey' | 'queryFn' | 'initialData'
  > & { initialData?: () => undefined },
> = (
  ...[variables, options, axiosConfig]: TVariables extends Record<any, never>
    ? [TVariables?, THookOptions?, GraphQlRequestAxiosConfig?]
    : keyof RemoveIndex<TVariables> extends never
    ? [TVariables?, THookOptions?, GraphQlRequestAxiosConfig?]
    : [TVariables, THookOptions?, GraphQlRequestAxiosConfig?]
) => UseGraphQLQueryReturn<TData>;

export const createGraphQlQuery =
  <TData, TVariables>(
    document: TypedDocumentNode<TData, TVariables>
  ): CreateGraphQlQueryReturn<TData, TVariables> =>
  (...[variables, options, axiosConfig]) => {
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/
    /* @ts-ignore*/
    return useGraphQLQuery(document, variables, options, axiosConfig);
  };
