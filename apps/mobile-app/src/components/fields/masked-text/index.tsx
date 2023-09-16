import {
  MaskedTextInput,
  MaskedTextInputProps,
} from '$components/dumb/masked-text-input';
import { mergeFunctions } from '$tools/merge-functions';
import React, { forwardRef, memo } from 'react';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';
import { View } from 'react-native';
import { HelperText } from 'react-native-paper';

export type MaskedTextFieldProps = {
  //
} & Omit<ControllerProps, 'render' | 'control'> &
  MaskedTextInputProps;

export const MaskedTextField = memo(
  forwardRef<React.ComponentRef<typeof MaskedTextInput>, MaskedTextFieldProps>(
    function MaskedTextField(
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
              <MaskedTextInput
                mode='outlined'
                disabled={disabled}
                {...props}
                ref={mergeRefs([ref, forwardedRef])}
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
    }
  )
);
