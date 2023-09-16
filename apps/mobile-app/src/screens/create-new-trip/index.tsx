import { commonStyles } from '$styles/common';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from 'react-native-paper';
import { View } from 'react-native';
import { DateTimeField, dateTimeRegex } from '$components/fields/date-time';
import { TextField } from '$components/fields/text';
import { MaskedTextField } from '$components/fields/masked-text';

export type CreateNewTripScreenProps = {
  children?: React.ReactNode;
};

export const CreateNewTripScreen: React.FC<CreateNewTripScreenProps> = () => {
  const methods = useForm({
    defaultValues: {
      source: '',
      phone: '',
      destination: '',
      at: null as Date | null,
    },
  });

  const onSubmit = methods.handleSubmit(data => console.log(data));

  return (
    <SafeAreaView style={[commonStyles.flexFull, commonStyles.screenPadding]}>
      <FormProvider {...methods}>
        <TextField
          label='Source'
          name='source'
          rules={{
            required: 'Source is a required field',
          }}
        />
        <MaskedTextField
          label='phone'
          name='phone'
          mask='9999999999'
          keyboardType='numeric'
          rules={{
            required: 'Phone is required',
          }}
        />
        <DateTimeField
          name='at'
          label='Date'
          rules={{
            pattern: {
              message: 'not proper date',
              value: dateTimeRegex,
            },
          }}
        />

        <View style={{ flex: 1 }} />
        <Button mode='contained' onPress={onSubmit}>
          Create
        </Button>
      </FormProvider>
    </SafeAreaView>
  );
};
