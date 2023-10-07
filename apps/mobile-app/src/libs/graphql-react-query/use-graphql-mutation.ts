/* eslint-disable @typescript-eslint/no-explicit-any */

import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import { GraphQlRequestAxiosConfig, graphqlRequest } from '$libs/axios/graphql';
import { AxiosError } from 'axios';
import { RemoveIndex } from 'graphql-request/build/esm/helpers';

export type UseGraphQLMutationReturn<TData, TVariables> = UseMutationResult<
  TData,
  AxiosError,
  TVariables
>;

export const useGraphQLMutation = <
  TData,
  TVariables,
  TArg = TVariables extends Record<any, never> // do we have explicitly no variables allowed?
    ? void
    : keyof RemoveIndex<TVariables> extends never // do we get an empty variables object?
    ? void
    : TVariables,
>(
  document: TypedDocumentNode<TData, TVariables>,
  options?: Omit<UseMutationOptions<TData, unknown, TArg>, 'mutationKey' | 'mutationFn'>,
  axiosConfig?: GraphQlRequestAxiosConfig
): UseGraphQLMutationReturn<TData, TArg> =>
  useMutation<TData, AxiosError, TArg>({
    ...options,
    mutationKey: (document.definitions[0] as any).name.value,
    mutationFn: async variables =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      graphqlRequest<TData, TVariables>(document, variables, axiosConfig),
  });
