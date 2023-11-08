import { mergeFunctions } from '$tools/merge-functions';
import React, { forwardRef, memo, useMemo } from 'react';
import { View, ViewProps } from 'react-native';
import { HelperText } from 'react-native-paper';
import { mergeRefs } from 'react-merge-refs';
import { useAppTheme } from '$theme/hook';
import { FieldComponentProps, createField } from '$tools/create-field';
import { DropdownInput, DropdownInputProps } from '$components/inputs/dropdown';
import { ListItem } from '$components/inputs/select/types';

export type DropdownFieldProps = {
  viewContainerProps?: ViewProps;
} & DropdownInputProps;

export const DropdownField = createField<DropdownFieldProps>(
  memo(
    forwardRef<
      React.ComponentRef<typeof DropdownInput>,
      FieldComponentProps<DropdownFieldProps>
    >(function DropdownField(
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

      const finalValue = useMemo(() => (Array.isArray(value) ? value : [value]), [value]);

      return (
        <View {...viewContainerProps}>
          <DropdownInput
            mode='outlined'
            disabled={disabled}
            outlineColor={color}
            textColor={color}
            underlineColor={color}
            activeOutlineColor={color}
            activeUnderlineColor={color}
            placeholderTextColor={color}
            {...props}
            ref={mergeRefs([forwardedRef, ref])}
            onBlur={mergeFunctions(onBlur, props.onBlur)}
            onSelectFinish={mergeFunctions((selected: ListItem[]) => {
              onChange(
                props.multiEnable ? selected.map(el => el.value) : selected[0].value
              );
            }, props.onChangeText)}
            selected={finalValue}
            menuProps={{
              ...props.menuProps,
              onDismiss: mergeFunctions(onBlur, props.menuProps?.onDismiss),
            }}
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
