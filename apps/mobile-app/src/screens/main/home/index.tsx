import MapView, { Marker } from 'react-native-maps';
import { commonStyles } from '$styles/common';
import { useAtom } from 'jotai/react';
import { mapRegionAtom } from '$atoms/map-region';
import { useAppColorSchema } from '$hooks/use-app-color-schema';
import React, { useCallback, useMemo, useState } from 'react';
import { TripMapMarkerCard } from '$components/dumb/trip-map-marker-card';
import { useRefreshOnFocus } from '$libs/react-query/use-refetch-on-screen-focus';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { useMapTripsQuery } from '$apis/trips';
import { MaterialCommunityIcon } from '$components/icons';
import { IDUnion } from '$models/id';

import MapViewDirections from 'react-native-maps-directions';
import { dropoffToLatlng, pickupToLatlng } from '$helpers/pickup-dropoff-to-latlng';
import { GOOGLE_SERVICES_API } from '@env';
import { Trip } from '$components/dumb/trip';

export type MainHomeScreenProps = {
  //
};

export const MainHomeScreen: React.FC<MainHomeScreenProps> = () => {
  const tripsQuery = useMapTripsQuery({
    tripsQueryMeta: { limit: 10, page: 1 },
  });

  const [focusedTripId, setFocusedTripId] = useState<IDUnion | undefined>();

  useRefreshOnFocus(tripsQuery.refetch);

  const trips = tripsQuery.data?.trips.items;

  const [mapRegion, setMapRegion] = useAtom(mapRegionAtom);
  const colorSchema = useAppColorSchema();

  const onMarkerClick = useCallback((id: IDUnion) => setFocusedTripId(id), []);

  const tripsMarkers = useMemo(
    () =>
      trips?.map(trip => (
        <React.Fragment key={trip.id}>
          <Marker
            onPress={() => onMarkerClick(trip.id)}
            coordinate={{
              latitude: trip.pickupLatitude,
              longitude: trip.pickupLongitude,
            }}
          >
            <TripMapMarkerCard>
              <MaterialCommunityIcon name='car' size={18} />
            </TripMapMarkerCard>
          </Marker>
          <Marker
            onPress={() => onMarkerClick(trip.id)}
            coordinate={{
              latitude: trip.dropoffLatitude,
              longitude: trip.dropoffLongitude,
            }}
          >
            <TripMapMarkerCard>
              <MaterialCommunityIcon name='flag-checkered' size={18} />
            </TripMapMarkerCard>
          </Marker>
        </React.Fragment>
      )),
    [onMarkerClick, trips]
  );

  const focusedTrip = useMemo(
    () => trips?.find(trip => trip.id === focusedTripId),
    [focusedTripId, trips]
  );

  const focusedTripMapViewDirections = useMemo(
    () =>
      focusedTrip && (
        <MapViewDirections
          origin={pickupToLatlng(focusedTrip)}
          destination={dropoffToLatlng(focusedTrip)}
          apikey={GOOGLE_SERVICES_API}
          strokeWidth={4}
          strokeColor='#0007'
        />
      ),
    [focusedTrip]
  );

  return (
    <ScreenWrapper disablePadding>
      <MapView
        style={commonStyles.flexFull}
        initialRegion={mapRegion}
        userInterfaceStyle={colorSchema}
        onRegionChangeComplete={setMapRegion}
      >
        {tripsMarkers}
        {focusedTripMapViewDirections}
      </MapView>
      {focusedTrip && (
        <Trip
          style={{ position: 'absolute', top: 16, left: 16, right: 16 }}
          {...focusedTrip}
          onJoin={() => {}}
          onShowMore={() => {}}
          onClose={() => setFocusedTripId(undefined)}
        />
      )}
    </ScreenWrapper>
  );
};
