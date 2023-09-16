import { mergeFunctions } from '$tools/merge-functions';
import React, { forwardRef, memo } from 'react';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';
import { mergeRefs } from 'react-merge-refs';

export type TextFieldProps = {
  //
} & Omit<ControllerProps, 'render' | 'control'> &
  TextInputProps;

export const TextField = memo(
  forwardRef<React.ComponentRef<typeof TextInput>, TextFieldProps>(function TextField(
    { name, defaultValue, disabled, rules, shouldUnregister, ...props },
    forwardedRef
  ) {
    const { control } = useFormContext();
    return (
      <Controller
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        rules={rules}
        shouldUnregister={shouldUnregister}
        control={control}
        render={({
          field: { ref, onChange, onBlur, value, disabled },
          fieldState: { error },
        }) => (
          <View>
            <TextInput
              mode='outlined'
              disabled={disabled}
              {...props}
              ref={mergeRefs([forwardedRef, ref])}
              onBlur={mergeFunctions(onBlur, props.onBlur)}
              onChangeText={mergeFunctions(onChange, props.onChangeText)}
              value={value}
            />
            {error && (
              <HelperText type='error' visible>
                {error.message}
              </HelperText>
            )}
          </View>
        )}
      />
    );
  })
);
