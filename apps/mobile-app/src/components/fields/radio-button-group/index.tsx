import { FieldComponentProps, createField } from '$tools/create-field';
import { mergeFunctions } from '$tools/merge-functions';
import React, { memo } from 'react';
import { View, ViewProps } from 'react-native';
import { HelperText, RadioButton } from 'react-native-paper';

export type RadioButtonGroupFieldProps = {
  children?: React.ReactNode;
  viewContainerProps?: ViewProps;
};

export const RadioButtonGroupField = createField<RadioButtonGroupFieldProps>(
  memo<FieldComponentProps<RadioButtonGroupFieldProps>>(function RadioButtonGroupField({
    form: {
      field: { onChange, onBlur, value },
      fieldState: { error },
    },
    children,
    viewContainerProps,
  }) {
    return (
      <View {...viewContainerProps}>
        <RadioButton.Group onValueChange={mergeFunctions(onChange, onBlur)} value={value}>
          {children}
        </RadioButton.Group>
        {error && (
          <HelperText type='error' visible>
            {error.message}
          </HelperText>
        )}
      </View>
    );
  })
);
