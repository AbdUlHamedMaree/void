import { LoadingSection } from '$components/dumb/loading-section';
import { Trip, TripProps } from '$components/dumb/trip';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { graphql } from '$gql';
import { useGraphQLQuery } from '$libs/react-query/use-graphql-query';
import { spacing } from '$theme/spacing';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { VirtualizedList } from 'react-native';
import { FAB } from 'react-native-paper';

const tripsDocument = graphql(`
  query TripsTripsQuery($tripsQueryMeta: MetaRequest!) {
    trips(meta: $tripsQueryMeta) {
      items {
        id
        capacity
        occupiedSeats
        status
        seatsStatus
        type
        createdById
        plannedAt

        timeline {
          id
          latitude
          longitude
          occupiedSeats
          status
        }

        passengers {
          id
          email
          phone
        }

        reservations {
          userId
          poolerType
          requestedSeatsCount
        }

        driver {
          id
          email
          phone
        }

        pickupAddress {
          addressLineOne
          addressLineTwo
          area
          city
          country
          postCode
        }
        pickupLatitude
        pickupLongitude

        dropoffAddress {
          addressLineOne
          addressLineTwo
          area
          city
          country
          postCode
        }
        dropoffLatitude
        dropoffLongitude
      }
      meta {
        limit
        page
        totalCount
        totalPages
      }
    }
  }
`);

export type MainTripsScreenProps = {
  //
};

export const MainTripsScreen: React.FC<MainTripsScreenProps> = () => {
  const tripsQuery = useGraphQLQuery(tripsDocument, {
    tripsQueryMeta: { limit: 10, page: 1 },
  });
  const { navigate } = useNavigation();

  const trips = tripsQuery.data?.trips.items;

  return (
    <ScreenWrapper disablePadding>
      <LoadingSection
        loading={tripsQuery.status === 'loading'}
        error={tripsQuery.status === 'error'}
        empty={trips?.length === 0}
      >
        {trips && (
          <VirtualizedList<TripProps & { key: string }>
            renderItem={item => (
              <Trip
                style={{ marginHorizontal: spacing.md, marginVertical: spacing.sm }}
                {...item.item}
              />
            )}
            keyExtractor={item => item.key}
            getItemCount={() => trips.length}
            getItem={(_, i) => {
              const trip = trips[i];
              return {
                key: trip.id + '',
                source: trip.pickupAddress.addressLineOne ?? undefined,
                dest: trip.dropoffAddress.addressLineOne ?? undefined,
                time: new Date(trip.plannedAt),
                emptySeatsCount: (trip.capacity ?? 1) / (trip.occupiedSeats ?? 1),
              };
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
    </ScreenWrapper>
  );
};
