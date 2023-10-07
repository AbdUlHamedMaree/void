import { mergeFunctions } from '$tools/merge-functions';
import React, { forwardRef, memo } from 'react';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';
import { mergeRefs } from 'react-merge-refs';
import { useAppTheme } from '$theme/hook';

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
    const theme = useAppTheme();

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
        }) => {
          const color = error ? theme.colors.error : undefined;

          return (
            <View>
              <TextInput
                mode='outlined'
                disabled={disabled}
                outlineColor={color}
                textColor={color}
                cursorColor={color}
                underlineColor={color}
                activeOutlineColor={color}
                activeUnderlineColor={color}
                placeholderTextColor={color}
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
          );
        }}
      />
    );
  })
);
