import {
  MaskedTextInput,
  MaskedTextInputProps,
} from '$components/dumb/masked-text-input';
import { useAppTheme } from '$theme/hook';
import { FieldComponentProps, createField } from '$tools/create-field';
import { mergeFunctions } from '$tools/merge-functions';
import React, { forwardRef, memo } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { View, ViewProps } from 'react-native';
import { HelperText } from 'react-native-paper';

export type MaskedTextFieldProps = {
  viewContainerProps?: ViewProps;
} & MaskedTextInputProps;

export const MaskedTextField = createField<MaskedTextFieldProps>(
  memo(
    forwardRef<
      React.ComponentRef<typeof MaskedTextInput>,
      FieldComponentProps<MaskedTextFieldProps>
    >(function MaskedTextField(
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

      return (
        <View {...viewContainerProps}>
          <MaskedTextInput
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
            ref={mergeRefs([ref, forwardedRef])}
            onBlur={mergeFunctions(onBlur, props.onBlur)}
            onChangeText={mergeFunctions(onChange, props.onChangeText)}
            value={value + ''}
          />
          {error && (
            <HelperText type='error' visible>
              {error.message}
            </HelperText>
          )}
        </View>
      );
    })
  )
);
