import { LoadingSection } from '$components/dumb/loading-section';
import { Trip } from '$components/dumb/trip';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { useRefreshOnFocus } from '$libs/react-query/use-refetch-on-screen-focus';
import { spacing } from '$theme/spacing';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { VirtualizedList } from 'react-native';
import { FAB } from 'react-native-paper';
import { useJoinTripModal } from '$hooks/use-join-trip-modal';
import { useTripsQuery } from '$apis/trips';
import { IDUnion } from '$models/id';
import { TripCardModel } from '$fragments/trip-card';

export type AllTripsScreenProps = {
  //
};

export const AllTripsScreen: React.FC<AllTripsScreenProps> = () => {
  const tripsQuery = useTripsQuery({
    tripsQueryMeta: { limit: 10, page: 1 },
  });
  useRefreshOnFocus(tripsQuery.refetch);

  const trips = tripsQuery.data?.trips.items;

  const { navigate } = useNavigation();

  const [selectedTripId, setSelectedTripId] = useState<IDUnion | null>(null);

  const selectedTrip = useMemo(
    () => trips?.find(trip => trip.id === selectedTripId),
    [selectedTripId, trips]
  );

  const handleJoinTripModalCancel = useCallback(() => {
    setSelectedTripId(null);
  }, []);

  const handleJoinTripModalJoin = handleJoinTripModalCancel;

  const joinTripModal = useJoinTripModal({
    trip: selectedTrip,
    onCancel: handleJoinTripModalCancel,
    onJoin: handleJoinTripModalJoin,
  });

  const handleCardJoin = useCallback((id: IDUnion) => {
    setSelectedTripId(id);
  }, []);

  const handleShowMore = useCallback(
    (id: IDUnion) => {
      navigate('Main', {
        screen: 'Trips',
        params: { screen: 'Single', params: { id } },
      });
    },
    [navigate]
  );

  return (
    <ScreenWrapper disablePadding>
      <LoadingSection
        loading={tripsQuery.status === 'loading'}
        error={tripsQuery.status === 'error'}
        empty={trips?.length === 0}
      >
        {trips && (
          <VirtualizedList<TripCardModel & { id: number }>
            keyExtractor={item => item.id + ''}
            getItemCount={trips => trips.length}
            getItem={(trips, i) => trips[i]}
            data={trips}
            renderItem={item => {
              const { id, ...props } = item.item;
              return (
                <Trip
                  {...props}
                  style={{ marginHorizontal: spacing.lg, marginVertical: spacing.md }}
                  onJoin={() => handleCardJoin(id)}
                  onShowMore={() => handleShowMore(id)}
                />
              );
            }}
          />
        )}
      </LoadingSection>
      <FAB
        icon='plus'
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => navigate('CreateNewTrip')}
      />
      {joinTripModal}
    </ScreenWrapper>
  );
};
