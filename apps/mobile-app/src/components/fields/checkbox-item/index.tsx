import { FieldComponentProps, createField } from '$tools/create-field';
import { mergeFunctions } from '$tools/merge-functions';
import React, { memo } from 'react';
import { View, ViewProps } from 'react-native';
import { Checkbox, CheckboxItemProps, HelperText } from 'react-native-paper';

export type CheckboxItemFieldProps = {
  viewContainerProps?: ViewProps;
} & Omit<CheckboxItemProps, 'status'>;

export const CheckboxItemField = createField<CheckboxItemFieldProps>(
  memo<FieldComponentProps<CheckboxItemFieldProps>>(function CheckboxItemField({
    form: {
      field: { onChange, onBlur, value, disabled },
      fieldState: { error },
    },
    viewContainerProps,
    ...props
  }) {
    return (
      <View {...viewContainerProps}>
        <Checkbox.Item
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
