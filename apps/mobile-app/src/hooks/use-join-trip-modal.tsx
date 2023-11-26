import { useJoinTripMutation } from '$apis/trips';
import { useMeQuery } from '$apis/user';
import { JoinTripFormFields, JoinTripModal } from '$components/smart/join-trip-modal';
import { TripOt } from '$gql/graphql';
import { toast } from '$modules/react-native-paper-toast';
import { useNavigation } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import { useCallback, useMemo, useState } from 'react';

export type UseJoinTripModalArg = {
  trip?: Pick<TripOt, 'id' | 'capacity' | 'occupiedSeats'>;

  onJoin?: (values: JoinTripFormFields) => Promise<void> | void;
  onCancel?: () => void;
};

export const useJoinTripModal = ({ trip, onJoin, onCancel }: UseJoinTripModalArg) => {
  const joinTripMutation = useJoinTripMutation();
  const meQuery = useMeQuery();

  const user = meQuery.data?.me;

  const [visible, setVisible] = useState(false);

  const { navigate } = useNavigation();

  const open = useCallback(() => {
    if (!user) {
      return navigate('Main', {
        screen: 'Profile',
        params: {
          screen: 'Login',
          params: {
            toast: {
              message: 'You need to be logged in to be able to join trips!',
              type: 'warning',
            },
          },
        },
      });
    }

    setVisible(true);
  }, [navigate, user]);

  const close = useCallback(() => setVisible(false), []);

  const availableSeatsCount = useMemo(
    () => (trip?.capacity ?? 1) - (trip?.occupiedSeats ?? 0),
    [trip?.capacity, trip?.occupiedSeats]
  );

  const handleJoin = useCallback(
    async (values: JoinTripFormFields) => {
      if (!trip) return;

      try {
        await joinTripMutation.mutateAsync({
          joinTripId: trip.id,
          joinTripPayload: {
            requestedSeatsCount: values.count,
            poolerType: values.isDriver ? 'driver' : 'passenger',
          },
        });

        await onJoin?.(values);

        toast.success('Trip joined successfully!');
        close();
      } catch (err) {
        console.error(err);
        if (isAxiosError(err)) {
          toast.error(err.message);
        }
      }
    },
    [close, joinTripMutation, onJoin, trip]
  );

  const handleCancel = useCallback(async () => {
    await onCancel?.();
    close();
  }, [close, onCancel]);

  const modalJsx = useMemo(
    () => (
      <JoinTripModal
        availableSeatsCount={availableSeatsCount}
        visible={visible}
        onJoin={handleJoin}
        onCancel={handleCancel}
      />
    ),
    [availableSeatsCount, handleCancel, handleJoin, visible]
  );

  return {
    modal: modalJsx,
    open,
    close,
  };
};
