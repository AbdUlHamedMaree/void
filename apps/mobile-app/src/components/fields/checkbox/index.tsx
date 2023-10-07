import { mergeFunctions } from '$tools/merge-functions';
import React, { memo } from 'react';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { Checkbox, CheckboxProps, HelperText } from 'react-native-paper';

export type CheckboxFieldProps = {
  //
} & Omit<ControllerProps, 'render' | 'control'> &
  Omit<CheckboxProps, 'status'>;

export const CheckboxField = memo<CheckboxFieldProps>(function CheckboxField({
  name,
  defaultValue,
  disabled,
  rules,
  shouldUnregister,
  ...props
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
      render={({
        field: { onChange, onBlur, value, disabled },
        fieldState: { error },
      }) => (
        <View>
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
      )}
    />
  );
});
