/* eslint-disable @typescript-eslint/no-explicit-any */

import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { GraphQlRequestAxiosConfig, graphqlRequest } from '$libs/axios/graphql';
import { RemoveIndex } from 'graphql-request/build/esm/helpers';
import { Variables } from 'graphql-request';

export type UseGraphQLQueryReturn<TData> = UseQueryResult<TData>;

export const useGraphQLQuery = <
  TData,
  TVariables = Variables,
  TKey extends unknown[] = [string, TVariables?],
  THookOptions = Omit<
    UseQueryOptions<TData, unknown, TData, TKey>,
    'queryKey' | 'queryFn' | 'initialData'
  > & { initialData?: () => undefined },
>(
  document: TypedDocumentNode<TData, TVariables>,
  ...[variables, options, axiosConfig]: TVariables extends Record<any, never>
    ? [TVariables?, THookOptions?, GraphQlRequestAxiosConfig?]
    : keyof RemoveIndex<TVariables> extends never
    ? [TVariables?, THookOptions?, GraphQlRequestAxiosConfig?]
    : [TVariables, THookOptions?, GraphQlRequestAxiosConfig?]
): UseGraphQLQueryReturn<TData> =>
  useQuery<TData, unknown, TData, TKey>({
    ...options,
    queryKey: [(document.definitions[0] as any).name.value, variables] as TKey,
    queryFn: ({ queryKey, signal }) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      graphqlRequest(document, queryKey[1], { ...axiosConfig, signal }),
  });
