import { Variables, request } from 'graphql-request';
import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { API_BASE_URL } from '@env';

export const useGraphQLMutation = <TData, TVariables extends Variables | undefined>(
  document: TypedDocumentNode<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, unknown, TVariables>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation<TData, unknown, TVariables>({
    ...options,
    mutationKey: (document.definitions[0] as any).name.value,
    mutationFn: async variables =>
      request({
        url: API_BASE_URL + '/graphql',
        document: document,
        variables: variables,
      }),
  });
