import {
  MaskedTextInput,
  MaskedTextInputProps,
} from '$components/dumb/masked-text-input';
import { useAppTheme } from '$theme/hook';
import { mergeFunctions } from '$tools/merge-functions';
import { format, parse } from 'date-fns';
import React, { forwardRef, memo, useState } from 'react';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import {
  DatePickerModal,
  DatePickerModalSingleProps,
  TimePickerModal,
  en,
  registerTranslation,
} from 'react-native-paper-dates';

registerTranslation('en', en);

export const dateTimeRegex =
  /[0-3]?[0-9]\/[01]?[0-9]\/[12]?[09]?[0-9][0-9] [01]?[0-6]:[0-6][0-9] [aApP][mM]/;

export const dateTimeFormate = 'LL/dd/yyyy hh:mm aa';

export const fallbackDateTimeString = '01/01/2020 12:00 PM';

export const dateTimeMask = '99/99/9999 99:99 AA';

export const dateTimeFormatHelperText = 'DD/MM/YYYY HH:MM XP';

const completeDateStringWithDefault = (value: string) =>
  value + fallbackDateTimeString.substring(value.length, fallbackDateTimeString.length);

export type DateTimeFieldProps = {
  datePickerProps?: Partial<DatePickerModalSingleProps>;
  timePickerProps?: Partial<React.ComponentProps<typeof TimePickerModal>>;
} & Omit<ControllerProps, 'render' | 'control'> &
  MaskedTextInputProps;

export const DateTimeField: React.FC<DateTimeFieldProps> = memo(
  forwardRef<React.ComponentRef<typeof MaskedTextInput>, DateTimeFieldProps>(
    function DateTimeField(
      {
        name,
        defaultValue,
        disabled,
        rules,
        shouldUnregister,
        datePickerProps,
        timePickerProps,
        ...props
      },
      forwardedRef
    ) {
      const { control } = useFormContext();
      const theme = useAppTheme();

      const [fieldValue, setFieldValue] = useState('');

      const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
      const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

      const openDatePicker = () => setIsDatePickerOpen(true);
      const closeDatePicker = () => setIsDatePickerOpen(false);

      const openTimePicker = () => setIsTimePickerOpen(true);
      const closeTimePicker = () => setIsTimePickerOpen(false);

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

            const finalHours = value?.getHours();
            const finalMinutes = value?.getMinutes();

            return (
              <>
                <DatePickerModal
                  locale='en'
                  mode='single'
                  visible={isDatePickerOpen}
                  date={value}
                  {...datePickerProps}
                  onDismiss={mergeFunctions(
                    onBlur,
                    datePickerProps?.onDismiss,
                    closeDatePicker
                  )}
                  onConfirm={mergeFunctions(
                    ({ date }) => {
                      typeof finalHours === 'number' && date?.setHours(finalHours);

                      typeof finalMinutes === 'number' && date?.setMinutes(finalMinutes);

                      onChange(date);
                      setFieldValue(format(date, dateTimeFormate));
                    },
                    datePickerProps?.onConfirm,
                    closeDatePicker,
                    openTimePicker
                  )}
                />
                <TimePickerModal
                  locale='en'
                  hours={finalHours}
                  minutes={finalMinutes}
                  visible={isTimePickerOpen}
                  {...timePickerProps}
                  onDismiss={mergeFunctions(
                    onBlur,
                    closeTimePicker,
                    timePickerProps?.onDismiss
                  )}
                  onConfirm={mergeFunctions(
                    ({ hours, minutes }) => {
                      const date = value ? new Date(value) : new Date();

                      date.setHours(hours);
                      date.setMinutes(minutes);

                      onChange(date);
                      setFieldValue(format(date, dateTimeFormate));
                    },
                    onBlur,
                    closeTimePicker,
                    timePickerProps?.onConfirm
                  )}
                />
                <View>
                  <MaskedTextInput
                    value={fieldValue}
                    disabled={disabled}
                    mode='outlined'
                    mask={dateTimeMask}
                    outlineColor={color}
                    textColor={color}
                    cursorColor={color}
                    underlineColor={color}
                    activeOutlineColor={color}
                    activeUnderlineColor={color}
                    placeholderTextColor={color}
                    {...props}
                    onChangeText={mergeFunctions(
                      text => {
                        const fullText = completeDateStringWithDefault(text);

                        const date = parse(fullText, dateTimeFormate, 0);

                        if (isNaN(date.getDay())) return;

                        onChange(date);
                      },
                      setFieldValue,
                      props.onChangeText
                    )}
                    ref={mergeRefs([ref, forwardedRef])}
                    right={
                      <TextInput.Icon
                        icon='calendar'
                        size={20}
                        disabled={disabled}
                        onPress={openDatePicker}
                      />
                    }
                  />

                  <HelperText type={error ? 'error' : 'info'} visible>
                    {error ? error.message : dateTimeFormatHelperText}
                  </HelperText>
                </View>
              </>
            );
          }}
        />
      );
    }
  )
);
