import React, { forwardRef, memo, useCallback } from 'react';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';

export type FieldProps<T> = T & Omit<ControllerProps, 'render' | 'control'>;
export type FieldComponentProps<T> = T & { form: RenderArg };
export type RenderFn = ControllerProps['render'];
export type RenderArg = Parameters<RenderFn>[0];

export const createField = <T,>(Component: React.ComponentType<FieldComponentProps<T>>) =>
  memo(
    forwardRef<React.ComponentRef<typeof Component>, FieldProps<T>>(function Field(
      { name, defaultValue, disabled, rules, shouldUnregister, ...props },
      ref
    ) {
      const { control } = useFormContext();

      const render = useCallback<RenderFn>(
        form => <Component {...(props as T)} form={form} ref={ref} />,
        [props, ref]
      );

      return (
        <Controller
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          rules={rules}
          shouldUnregister={shouldUnregister}
          control={control}
          render={render}
        />
      );
    })
  );
