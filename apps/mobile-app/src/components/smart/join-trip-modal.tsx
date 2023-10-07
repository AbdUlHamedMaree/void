import { CheckboxItemField } from '$components/fields/checkbox-item';
import { TextField } from '$components/fields/text';
import { spacing } from '$theme/spacing';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { coerce, object } from 'zod';

export type JoinTripFormFields = {
  count: number;
  isDriver: boolean;
};

export type JoinTripModalProps = {
  availableSeatsCount?: number;
  visible?: boolean;

  onJoin?: (values: JoinTripFormFields) => Promise<void>;
  onCancel?: () => void;
};

export const JoinTripModal: React.FC<JoinTripModalProps> = ({
  availableSeatsCount,
  visible,

  onJoin,
  onCancel,
}) => {
  const validationSchema = useMemo(() => {
    return object({
      count: coerce
        .number()
        .min(0)
        .max(availableSeatsCount ?? 8),
      isDriver: coerce.boolean(),
    });
  }, [availableSeatsCount]);

  const methods = useForm<JoinTripFormFields>({
    defaultValues: {
      count: 0,
      isDriver: false,
    },
    resolver: zodResolver(validationSchema),
  });

  const handleSubmit = methods.handleSubmit(async values => {
    await onJoin?.(values);
  });

  return (
    <Portal>
      <Dialog visible={!!visible} onDismiss={onCancel}>
        <Dialog.Title>Joining Trip</Dialog.Title>

        <Dialog.Content>
          <FormProvider {...methods}>
            <TextField
              name='count'
              label='Seats Count'
              style={{ backgroundColor: 'transparent' }}
            />
            <View style={{ marginVertical: spacing.md }} />
            <CheckboxItemField name='isDriver' label='Joining as driver?' />
          </FormProvider>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>Cancel</Button>
          <Button
            onPress={handleSubmit}
            loading={methods.formState.isLoading}
            disabled={methods.formState.isLoading}
          >
            Join
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
