/* eslint-disable @typescript-eslint/no-explicit-any */

import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { CreateGraphQlQueryReturn } from './create-graphql-query';
import { CreateGraphQlMutationReturn } from './create-graphql-mutation';

type QueriesInternal<
  TQueries extends readonly TypedDocumentNode<any, any>[],
  Index extends number[],
  TResult extends CreateGraphQlQueryReturn<any, any>[],
> = Index['length'] extends TQueries['length']
  ? TResult
  : QueriesInternal<
      TQueries,
      [...Index, 0],
      [
        ...TResult,
        TQueries[Index['length']] extends TypedDocumentNode<infer TData, infer TVariables>
          ? CreateGraphQlQueryReturn<TData, TVariables>
          : never,
      ]
    >;

export type Queries<TQueries extends readonly TypedDocumentNode<any, any>[]> =
  QueriesInternal<TQueries, [], []>;

type MutationsInternal<
  TMutations extends readonly TypedDocumentNode<any, any>[],
  Index extends number[],
  TResult extends CreateGraphQlMutationReturn<any, any>[],
> = Index['length'] extends TMutations['length']
  ? TResult
  : MutationsInternal<
      TMutations,
      [...Index, 0],
      [
        ...TResult,
        TMutations[Index['length']] extends TypedDocumentNode<
          infer TData,
          infer TVariables
        >
          ? CreateGraphQlMutationReturn<TData, TVariables>
          : never,
      ]
    >;

export type Mutations<TMutations extends readonly TypedDocumentNode<any, any>[]> =
  MutationsInternal<TMutations, [], []>;
