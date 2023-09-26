import { mergeFunctions } from '$tools/merge-functions';
import React, { memo } from 'react';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { HelperText, RadioButton } from 'react-native-paper';

export type RadioButtonGroupFieldProps = {
  children?: React.ReactNode;
} & Omit<ControllerProps, 'render' | 'control'>;

export const RadioButtonGroupField = memo<RadioButtonGroupFieldProps>(
  function RadioButtonGroupField({
    name,
    defaultValue,
    disabled,
    rules,
    shouldUnregister,
    children,
  }) {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        rules={rules}
        shouldUnregister={shouldUnregister}
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View>
            <RadioButton.Group
              onValueChange={mergeFunctions(onChange, onBlur)}
              value={value}
            >
              {children}
            </RadioButton.Group>
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
);
