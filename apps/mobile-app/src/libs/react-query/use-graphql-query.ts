import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { GraphQlRequestAxiosConfig, graphqlRequest } from '$libs/axios/graphql';

export const useGraphQLQuery = <
  TDate,
  TVariables = Record<string, unknown>,
  TKey extends unknown[] = TVariables extends Record<string, unknown>
    ? [string, TVariables]
    : [string, undefined],
>(
  document: TypedDocumentNode<TDate, TVariables>,
  ...[variables, options, axiosConfig]: TVariables extends Record<string, unknown>
    ? [
        TVariables?,
        (Omit<
          UseQueryOptions<TDate, unknown, TDate, TKey>,
          'queryKey' | 'queryFn' | 'initialData'
        > & { initialData?: () => undefined })?,
        GraphQlRequestAxiosConfig?,
      ]
    : [
        TVariables,
        (Omit<
          UseQueryOptions<TDate, unknown, TDate, TKey>,
          'queryKey' | 'queryFn' | 'initialData'
        > & { initialData?: () => undefined })?,
        GraphQlRequestAxiosConfig?,
      ]
) =>
  useQuery<TDate, unknown, TDate, TKey>({
    ...options,
    queryKey: [(document.definitions[0] as any).name.value, variables] as TKey,
    queryFn: ({ queryKey }) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      graphqlRequest(document, queryKey[1], axiosConfig),
  });
