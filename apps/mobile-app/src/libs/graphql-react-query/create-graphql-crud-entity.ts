/* eslint-disable @typescript-eslint/no-explicit-any */

import { queryClient } from '$libs/react-query/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { Mutations, Queries } from './types';
import { createGraphQlQuery } from './create-graphql-query';
import { createGraphQlMutation } from './create-graphql-mutation';

export type CreateCRUDEntityReturn<
  TQueries extends readonly TypedDocumentNode<any, any>[],
  TMutations extends readonly TypedDocumentNode<any, any>[],
> = {
  readonly queries: Queries<TQueries>;
  readonly mutations: Mutations<TMutations>;
};

export const createGraphQLCRUDEntity =
  <TQueries extends readonly TypedDocumentNode<any, any>[]>(
    ...queriesDocuments: TQueries
  ) =>
  <TMutations extends readonly TypedDocumentNode<any, any>[]>(
    ...mutationsDocuments: TMutations
  ): CreateCRUDEntityReturn<TQueries, TMutations> => {
    const queriesKeys = queriesDocuments.map(
      document => (document.definitions[0] as any).name.value
    );

    const queriesHooks = queriesDocuments.map(document => createGraphQlQuery(document));

    const mutationHooks = mutationsDocuments.map(document =>
      createGraphQlMutation(document, {
        onSuccess: () =>
          queriesKeys.map(key => queryClient.invalidateQueries({ queryKey: [key] })),
      })
    );

    return {
      queries: queriesHooks,
      mutations: mutationHooks,
    } as CreateCRUDEntityReturn<TQueries, TMutations>;
  };
