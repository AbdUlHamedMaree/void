import { mergeFunctions } from '$tools/merge-functions';
import React, { memo } from 'react';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';
import { View, ViewProps } from 'react-native';
import { HelperText } from 'react-native-paper';
import { useAppTheme } from '$theme/hook';
import { PaperSelect } from 'react-native-paper-select';
import type {
  ListItem,
  PaperSelectProps,
  SelectedItem,
} from 'react-native-paper-select/lib/typescript/interface/paperSelect.interface';

export type SelectFieldItemModel = ListItem & {
  label?: string;
};

const emptyValue: SelectedItem = {
  text: '',
  selectedList: [],
};

const emptyArray: SelectFieldItemModel[] = [];

export type SelectFieldProps = {
  options?: SelectFieldItemModel[];
  viewContainerProps?: ViewProps;
} & Omit<ControllerProps, 'render' | 'control'> &
  Partial<Omit<PaperSelectProps, 'arrayList'>>;

export const SelectField = memo<SelectFieldProps>(function SelectField({
  name,
  defaultValue,
  disabled,
  rules,
  shouldUnregister,
  viewContainerProps,
  ...props
}) {
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
        field: { onChange, onBlur, value: _value, disabled },
        fieldState: { error },
      }) => {
        const color = error ? theme.colors.error : undefined;

        const value = (_value ?? emptyValue) as SelectedItem;

        return (
          <View {...viewContainerProps}>
            <PaperSelect
              theme={{}}
              value={value.text}
              disabled={disabled}
              {...props}
              multiEnable={!!props.multiEnable}
              arrayList={props.options ?? emptyArray}
              label={props.label ?? ''}
              selectedArrayList={value.selectedList}
              onSelection={mergeFunctions(onChange, props.onSelection, onBlur)}
              textInputProps={{
                outlineColor: color,
                underlineColor: color,
                activeOutlineColor: color,
                activeUnderlineColor: color,
                ...props.textInputProps,
              }}
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
});
