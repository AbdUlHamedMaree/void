import { mergeFunctions } from '$tools/merge-functions';
import React, { forwardRef, memo, useMemo } from 'react';
import { View, ViewProps } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';
import { mergeRefs } from 'react-merge-refs';
import { useAppTheme } from '$theme/hook';
import { FieldComponentProps, createField } from '$tools/create-field';
import { isNil } from '$modules/checks';

export type TextFieldProps = {
  viewContainerProps?: ViewProps;
} & TextInputProps;

export const TextField = createField<TextFieldProps>(
  memo(
    forwardRef<React.ComponentRef<typeof TextInput>, FieldComponentProps<TextFieldProps>>(
      function TextField(
        {
          form: {
            field: { ref, onChange, onBlur, value, disabled },
            fieldState: { error },
          },
          viewContainerProps,
          ...props
        },
        forwardedRef
      ) {
        const theme = useAppTheme();

        const color = error ? theme.colors.error : undefined;

        const textValue = useMemo(() => {
          if (isNil(value)) return '';
          return value + '';
        }, [value]);

        return (
          <View {...viewContainerProps}>
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
              value={textValue}
            />
            {error && (
              <HelperText type='error' visible>
                {error.message}
              </HelperText>
            )}
          </View>
        );
      }
    )
  )
);
