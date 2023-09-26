import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { GraphQlRequestAxiosConfig, graphqlRequest } from '$libs/axios/graphql';
import { AxiosError } from 'axios';

export const useGraphQLMutation = <TData, TVariables = Record<string, unknown>>(
  document: TypedDocumentNode<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, unknown, TVariables>,
    'mutationKey' | 'mutationFn'
  >,
  axiosOptions?: GraphQlRequestAxiosConfig
) =>
  useMutation<TData, AxiosError, TVariables>({
    ...options,
    mutationKey: (document.definitions[0] as any).name.value,
    mutationFn: async variables =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      graphqlRequest<TData, TVariables>(document, variables, axiosOptions),
  });
