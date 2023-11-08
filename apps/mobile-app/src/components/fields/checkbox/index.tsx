import { FieldComponentProps, createField } from '$tools/create-field';
import { mergeFunctions } from '$tools/merge-functions';
import React, { memo } from 'react';
import { View, ViewProps } from 'react-native';
import { Checkbox, CheckboxProps, HelperText } from 'react-native-paper';

export type CheckboxFieldProps = {
  viewContainerProps?: ViewProps;
} & Omit<CheckboxProps, 'status'>;

export const CheckboxField = createField<CheckboxFieldProps>(
  memo<FieldComponentProps<CheckboxFieldProps>>(function CheckboxField({
    form: {
      field: { onChange, onBlur, value, disabled },
      fieldState: { error },
    },
    viewContainerProps,
    ...props
  }) {
    return (
      <View {...viewContainerProps}>
        <Checkbox
          {...props}
          status={value ? 'checked' : 'unchecked'}
          onPress={mergeFunctions(() => onChange(!value), props.onPress, onBlur)}
          disabled={disabled}
        />
        {error && (
          <HelperText type='error' visible>
            {error.message}
          </HelperText>
        )}
      </View>
    );
  })
);
