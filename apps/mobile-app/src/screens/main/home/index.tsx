import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { commonStyles } from '$styles/common';
import { useAtom } from 'jotai/react';
import { mapRegionAtom } from '$atoms/map-region';
import { useAppColorSchema } from '$hooks/use-app-color-schema';
import { graphql } from '$gql';
import { useMemo } from 'react';
import { TripMapMarkerCard } from '$components/dumb/trip-map-marker-card';
import { Text } from 'react-native-paper';
import { useGraphQLQuery } from '$libs/react-query/use-graphql-query';

const tripsDocument = graphql(`
  query HomeTripsQuery($tripsQueryMeta: MetaRequest!) {
    trips(meta: $tripsQueryMeta) {
      items {
        id
        capacity
        occupiedSeats
        status
        seatsStatus
        type
        createdById

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

export type MainHomeScreenProps = {
  //
};

export const MainHomeScreen: React.FC<MainHomeScreenProps> = () => {
  const tripsQuery = useGraphQLQuery(tripsDocument, {
    tripsQueryMeta: { limit: 10, page: 1 },
  });

  const trips = tripsQuery.data?.trips.items;

  const [mapRegion, setMapRegion] = useAtom(mapRegionAtom);
  const colorSchema = useAppColorSchema();

  const tripsMarkers = useMemo(
    () =>
      trips?.map(trip => (
        <>
          <Marker
            key={trip.id}
            coordinate={{
              latitude: trip.pickupLatitude,
              longitude: trip.pickupLongitude,
            }}
          >
            <TripMapMarkerCard>
              <Text>Pickup</Text>
            </TripMapMarkerCard>
          </Marker>
          <Marker
            coordinate={{
              latitude: trip.dropoffLatitude,
              longitude: trip.dropoffLongitude,
            }}
          >
            <TripMapMarkerCard>
              <Text>Dropoff</Text>
            </TripMapMarkerCard>
          </Marker>
        </>
      )),
    [trips]
  );

  return (
    <SafeAreaView style={commonStyles.flexFull}>
      <MapView
        style={commonStyles.flexFull}
        initialRegion={mapRegion}
        userInterfaceStyle={colorSchema}
        onRegionChange={setMapRegion}
      >
        {tripsMarkers}
      </MapView>
    </SafeAreaView>
  );
};
