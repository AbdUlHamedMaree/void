import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { resolveRequestDocument, RequestDocument, Variables } from 'graphql-request';
import { RemoveIndex } from 'graphql-request/build/esm/helpers';
import { graphqlWsClient } from './client';
import { GraphQLError } from 'graphql';
import { useState } from 'react';
import { ExecutionResult } from 'graphql-ws';

export type UseGraphQlSubscriptionHandlers<TResult> = {
  onData?: (data: TResult) => void;
  onError?: (err: Readonly<GraphQLError[]>, extensions?: unknown) => void;
  onUnknownError?: (err: unknown) => void;
  onResult?: (result: ExecutionResult<TResult, unknown>) => void;
  onComplete?: () => void;
};

export const useGraphQlSubscription = <TResult, TVariables extends Variables = Variables>(
  document: RequestDocument | TypedDocumentNode<TResult, TVariables>,
  handlers?: UseGraphQlSubscriptionHandlers<TResult>,
  ...[variables]: TVariables extends Record<any, never>
    ? [undefined?]
    : keyof RemoveIndex<TVariables> extends never
      ? [undefined?]
      : [TVariables]
) => {
  const unsubscribe = useState(() => {
    graphqlWsClient.subscribe<TResult>(
      {
        ...resolveRequestDocument(document),
        variables,
      },
      {
        next: result => {
          if (result.data) handlers?.onData?.(result.data);
          if (result.errors) handlers?.onError?.(result.errors, result.extensions);
          handlers?.onResult?.(result);
        },
        error: err => handlers?.onUnknownError?.(err),
        complete: () => handlers?.onComplete?.(),
      }
    );
  })[0];

  return unsubscribe;

  // useEffect(() => {
  //   const breakSignal = {
  //     current: false,
  //   };

  //   const a = graphqlWsClient.subscribe<TResult>(
  //     {
  //       ...resolveRequestDocument(document),
  //       variables,
  //     },
  //     {
  //       next: data => observer.next(data),
  //       error: err => observer.error(err),
  //       complete: () => observer.complete(),
  //     }
  //   );

  //   const subscription = graphqlWsClient.iterate<TResult>({
  //     ...resolveRequestDocument(document),
  //     variables,
  //   });

  //   (async () => {
  //     for await (const result of subscription) {
  //       if (breakSignal.current) break;

  //       if (result.data) handlers?.onData?.(result.data);
  //       if (result.errors) handlers?.onError?.(result.errors, result.extensions);
  //       handlers?.onResult?.(result);
  //     }
  //   })();

  //   return () => {
  //     breakSignal.current = true;
  //     subscription.return?.();
  //   };
  // }, [document, handlers, variables]);
};
