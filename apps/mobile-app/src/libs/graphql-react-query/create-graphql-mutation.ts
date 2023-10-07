import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { UseMutationOptions } from '@tanstack/react-query';
import { GraphQlRequestAxiosConfig } from '$libs/axios/graphql';
import { RemoveIndex } from 'graphql-request/build/esm/helpers';
import { UseGraphQLMutationReturn, useGraphQLMutation } from './use-graphql-mutation';
import { mergeFunctions } from '$tools/merge-functions';

export type CreateGraphQlMutationReturn<
  TData,
  TVariables,
  TArg = TVariables extends Record<any, never>
    ? void
    : keyof RemoveIndex<TVariables> extends never
    ? void
    : TVariables,
> = (
  options?: Omit<UseMutationOptions<TData, unknown, TArg>, 'mutationKey' | 'mutationFn'>,
  axiosConfig?: GraphQlRequestAxiosConfig
) => UseGraphQLMutationReturn<TData, TArg>;

export const createGraphQlMutation =
  <
    TData,
    TVariables,
    TArg = TVariables extends Record<any, never>
      ? void
      : keyof RemoveIndex<TVariables> extends never
      ? void
      : TVariables,
  >(
    document: TypedDocumentNode<TData, TVariables>,
    baseOptions?: Omit<
      UseMutationOptions<TData, unknown, TArg>,
      'mutationKey' | 'mutationFn'
    >,
    baseAxiosConfig?: GraphQlRequestAxiosConfig
  ): CreateGraphQlMutationReturn<TData, TVariables, TArg> =>
  (options, axiosConfig) =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useGraphQLMutation<TData, TVariables, TArg>(
      document,
      {
        ...baseOptions,
        ...options,
        onMutate: mergeFunctions(baseOptions?.onMutate, options?.onMutate),
        onSuccess: mergeFunctions(baseOptions?.onSuccess, options?.onSuccess),
        onError: mergeFunctions(baseOptions?.onError, options?.onError),
        onSettled: mergeFunctions(baseOptions?.onSettled, options?.onSettled),
      },
      { ...baseAxiosConfig, ...axiosConfig }
    );
