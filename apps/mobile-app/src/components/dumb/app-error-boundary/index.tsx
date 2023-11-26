import { mergeFunctions } from '$tools/merge-functions';
import React, { useCallback } from 'react';
import {
  ErrorBoundary,
  ErrorBoundaryPropsWithComponent,
  FallbackProps,
} from 'react-error-boundary';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export type ErrorSectionProps = {
  //
} & FallbackProps;

export const ErrorSection: React.FC<ErrorSectionProps> = ({ error }) => {
  return (
    <View>
      <Text>Something went wrong:</Text>
      <Text>{error.message}</Text>
    </View>
  );
};

export type AppErrorBoundaryProps = {
  //
} & Partial<ErrorBoundaryPropsWithComponent>;

export const AppErrorBoundary: React.FC<
  React.PropsWithChildren<AppErrorBoundaryProps>
> = ({ children, ...props }) => {
  const onError = useCallback(
    () => mergeFunctions(console.error, props.onError),
    [props.onError]
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorSection} {...props} onError={onError}>
      {children}
    </ErrorBoundary>
  );
};
