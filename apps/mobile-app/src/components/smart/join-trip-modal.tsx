import { CheckboxItemField } from '$components/fields/checkbox-item';
import { TextField } from '$components/fields/text';
import { useAppTheme } from '$theme/hook';
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
  const theme = useAppTheme();

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
    methods.reset();
  });

  return (
    <Portal>
      <Dialog
        visible={!!visible}
        onDismiss={onCancel}
        dismissable={!methods.formState.isSubmitting}
      >
        <Dialog.Title>Joining Trip</Dialog.Title>

        <Dialog.Content>
          <FormProvider {...methods}>
            <TextField
              name='count'
              label='Seats Count'
              mode='outlined'
              style={{ backgroundColor: theme.colors.elevation.level3 }}
            />
            <View style={{ marginVertical: spacing.sm }} />
            <CheckboxItemField name='isDriver' label='Joining as driver?' />
          </FormProvider>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={onCancel}
            loading={methods.formState.isSubmitting}
            disabled={methods.formState.isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onPress={handleSubmit}
            loading={methods.formState.isSubmitting}
            disabled={methods.formState.isSubmitting}
          >
            Join
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
