import {
  MaskedTextInput,
  MaskedTextInputProps,
} from '$components/dumb/masked-text-input';
import { useAppTheme } from '$theme/hook';
import { FieldComponentProps, createField } from '$tools/create-field';
import { mergeFunctions } from '$tools/merge-functions';
import { format, parse } from 'date-fns';
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import { View, ViewProps } from 'react-native';
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

export const dateTimeFormat = 'dd/LL/yyyy hh:mm aa';

export const fallbackDateTimeString = format(Date.now(), dateTimeFormat);

export const dateTimeMask = '99/99/9999 99:99 AA';

export const dateTimeFormatHelperText = 'DD/MM/YYYY HH:MM XP';

const completeDateStringWithDefault = (value: string) =>
  value + fallbackDateTimeString.substring(value.length, fallbackDateTimeString.length);

const tryParseDateString = (dateString: string) => {
  const fullDateString = completeDateStringWithDefault(dateString);

  try {
    const date = parse(fullDateString, dateTimeFormat, 0);

    if (!isNaN(date.getDay())) return date;
  } catch (err) {
    //
  }

  try {
    const date = new Date(dateString);

    if (!isNaN(date.getDay())) return date;
  } catch (err) {
    //
  }
};

export type DateTimeFieldProps = {
  datePickerProps?: Partial<DatePickerModalSingleProps>;
  timePickerProps?: Partial<React.ComponentProps<typeof TimePickerModal>>;
  viewContainerProps?: ViewProps;
} & MaskedTextInputProps;

export const DateTimeField = createField<DateTimeFieldProps>(
  memo(
    forwardRef<
      React.ComponentRef<typeof MaskedTextInput>,
      FieldComponentProps<DateTimeFieldProps>
    >(function DateTimeField(
      {
        form: {
          field: { ref, onChange, onBlur, value, disabled },
          fieldState: { error },
        },
        datePickerProps,
        timePickerProps,
        viewContainerProps,
        ...props
      },
      forwardedRef
    ) {
      const theme = useAppTheme();

      const [fieldValue, setFieldValue] = useState('');

      const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
      const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

      const openDatePicker = useCallback(() => setIsDatePickerOpen(true), []);
      const closeDatePicker = useCallback(() => setIsDatePickerOpen(false), []);

      const openTimePicker = useCallback(() => setIsTimePickerOpen(true), []);
      const closeTimePicker = useCallback(() => setIsTimePickerOpen(false), []);

      const color = error ? theme.colors.error : undefined;

      const dateValue = useMemo(() => {
        if (typeof value === 'string') {
          return tryParseDateString(value);
        }
        return value;
      }, [value]);

      useEffect(() => {
        if (dateValue) setFieldValue(format(dateValue, dateTimeFormat));
      }, [dateValue]);

      const finalHours = useMemo(() => dateValue?.getHours(), [dateValue]);
      const finalMinutes = useMemo(() => dateValue?.getMinutes(), [dateValue]);

      return (
        <>
          <DatePickerModal
            locale='en'
            mode='single'
            visible={isDatePickerOpen}
            date={dateValue}
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
                setFieldValue(format(date, dateTimeFormat));
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
                const date = dateValue ? new Date(dateValue) : new Date();

                date.setHours(hours);
                date.setMinutes(minutes);

                onChange(date);
                setFieldValue(format(date, dateTimeFormat));
              },
              onBlur,
              closeTimePicker,
              timePickerProps?.onConfirm
            )}
          />
          <View {...viewContainerProps}>
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
              onChangeText={mergeFunctions(setFieldValue, props.onChangeText)}
              onBlur={mergeFunctions(() => {
                if (!fieldValue) return;

                const fullText = completeDateStringWithDefault(fieldValue);
                const date = parse(fullText, dateTimeFormat, 0);

                if (isNaN(date.getDay())) return;

                setFieldValue(fullText);
                onChange(date);
              }, props.onBlur)}
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
    })
  )
);
