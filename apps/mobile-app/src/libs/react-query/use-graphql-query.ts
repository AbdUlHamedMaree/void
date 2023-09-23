import { request } from 'graphql-request';
import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '@env';

export const useGraphQLQuery = <TDate, TVariables>(
  document: TypedDocumentNode<TDate, TVariables>,
  ...[variables, options]: TVariables extends Record<string, never>
    ? [
        undefined,
        Omit<
          UseQueryOptions<TDate, unknown, TDate, [string, TVariables?]>,
          'queryKey' | 'queryFn' | 'initialData'
        > & { initialData?: () => undefined },
      ]
    : [
        TVariables,
        Omit<
          UseQueryOptions<TDate, unknown, TDate, [string, TVariables?]>,
          'queryKey' | 'queryFn' | 'initialData'
        > & { initialData?: () => undefined },
      ]
) =>
  useQuery<TDate, unknown, TDate, [string, TVariables?]>({
    ...options,
    queryKey: [(document.definitions[0] as any).name.value, variables],
    queryFn: ({ queryKey }) =>
      request(API_BASE_URL + '/graphql', document, queryKey[1] ? queryKey[1] : undefined),
  });
