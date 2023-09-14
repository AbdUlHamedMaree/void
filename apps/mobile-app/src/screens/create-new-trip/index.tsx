import { commonStyles } from '$styles/common';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { useState } from 'react';
import { mergeFunctions } from '$tools/merge-functions';
import { format } from 'date-fns';

const dateTimeRegex = /\d{1,2}\/\d{1,2}\/\d{2,4} \d{1,2}:\d{1,2} [aApP][mM]/;

export type CreateNewTripScreenProps = {
  children?: React.ReactNode;
};

export const CreateNewTripScreen: React.FC<CreateNewTripScreenProps> = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      source: '',
      destination: '',
      at: null as Date | null,
    },
  });

  const onSubmit = handleSubmit(data => console.log(data));

  const openDatePicker = () => setIsDatePickerOpen(true);
  const closeDatePicker = () => setIsDatePickerOpen(false);

  const openTimePicker = () => setIsTimePickerOpen(true);
  const closeTimePicker = () => setIsTimePickerOpen(false);

  return (
    <SafeAreaView style={[commonStyles.flexFull, commonStyles.screenPadding]}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value, ref, disabled } }) => (
          <TextInput
            mode='outlined'
            ref={ref}
            label='Source'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            disabled={disabled}
          />
        )}
        name='source'
      />
      <HelperText type='error' visible={!!errors.source}>
        Source is a required field
      </HelperText>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value, ref, disabled } }) => (
          <TextInput
            mode='outlined'
            ref={ref}
            label='Destination'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            disabled={disabled}
          />
        )}
        name='destination'
      />
      <HelperText type='error' visible={!!errors.destination}>
        Destination is a required field
      </HelperText>

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: dateTimeRegex,
        }}
        render={({ field: { onChange, onBlur, value, disabled } }) => (
          <>
            <DatePickerModal
              locale='en'
              mode='single'
              visible={isDatePickerOpen}
              onDismiss={mergeFunctions(onBlur, closeDatePicker)}
              onConfirm={mergeFunctions(
                ({ date }) => {
                  const hours = value?.getHours();
                  typeof hours === 'number' && date.setHours(hours);

                  const minutes = value?.getMinutes();
                  typeof minutes === 'number' && date.setMinutes(minutes);

                  onChange(date);
                },
                closeDatePicker,
                openTimePicker
              )}
              date={value ?? undefined}
            />
            <TimePickerModal
              locale='en'
              visible={isTimePickerOpen}
              onDismiss={mergeFunctions(onBlur, closeTimePicker)}
              onConfirm={mergeFunctions(({ hours, minutes }) => {
                const date = value ? new Date(value) : new Date();

                date.setHours(hours);
                date.setMinutes(minutes);

                onChange(date);
              }, closeTimePicker)}
              hours={value ? value.getHours() : undefined}
              minutes={value ? value.getMinutes() : undefined}
            />
            <TextInput
              label='MM/DD/YYYY HH:MM XM'
              value={value ? format(value, 'LL/dd/yyyy hh:mm aa') : ''}
              mode='outlined'
              disabled={disabled}
              right={
                <TextInput.Icon
                  icon='calendar'
                  size={20}
                  disabled={disabled}
                  onPress={openDatePicker}
                />
              }
            />
          </>
        )}
        name='at'
      />
      <HelperText type='error' visible={!!errors.at}>
        {errors.at?.type === 'required' && 'Date is a required field'}
        {errors.at?.type === 'pattern' && 'Date is not a proper time'}
      </HelperText>

      <View style={{ flex: 1 }} />
      <Button mode='contained' onPress={onSubmit}>
        Create
      </Button>
    </SafeAreaView>
  );
};
