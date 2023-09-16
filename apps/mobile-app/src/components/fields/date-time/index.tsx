import {
  MaskedTextInput,
  MaskedTextInputProps,
} from '$components/dumb/masked-text-input';
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

const completeDateStringWithDefault = (value: string) =>
  value + fallbackDateTimeString.substring(value.length, fallbackDateTimeString.length);

export type DateTimeFieldProps = {
  datePickerProps?: Partial<DatePickerModalSingleProps>;
  timePickerProps?: Partial<React.ComponentProps<typeof TimePickerModal>>;
} & Omit<ControllerProps, 'render' | 'control'> &
  MaskedTextInputProps;

export const dateTimeFormatHelperText = 'DD/MM/YYYY HH:MM XP';

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
            const finalDate = (() => {
              if (typeof value === 'string') {
                const fullValue = completeDateStringWithDefault(value);

                const date = parse(fullValue, dateTimeFormate, 0);

                return isNaN(date.getDay()) ? undefined : date;
              }

              if (value instanceof Date) return value;

              return undefined;
            })();

            const finalValue = (() => {
              if (value instanceof Date) return format(value, dateTimeFormate);

              if (typeof value === 'string') return value;

              return '';
            })();

            const finalHours = finalDate?.getHours();
            const finalMinutes = finalDate?.getMinutes();

            return (
              <>
                <DatePickerModal
                  locale='en'
                  mode='single'
                  visible={isDatePickerOpen}
                  date={finalDate}
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
                      const date = finalDate ? new Date(finalDate) : new Date();

                      date.setHours(hours);
                      date.setMinutes(minutes);

                      onChange(date);
                    },
                    onBlur,
                    closeTimePicker,
                    timePickerProps?.onConfirm
                  )}
                />
                <View>
                  <MaskedTextInput
                    value={finalValue}
                    disabled={disabled}
                    mode='outlined'
                    mask={dateTimeMask}
                    {...props}
                    onChangeText={mergeFunctions(onChange, props.onChangeText)}
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
