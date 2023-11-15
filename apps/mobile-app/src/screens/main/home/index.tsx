import MapView, { Details, LatLng, Region } from 'react-native-maps';
import { commonStyles } from '$styles/common';
import { useAtom } from 'jotai/react';
import { mapRegionAtom } from '$atoms/map-region';
import { useAppColorSchema } from '$hooks/use-app-color-schema';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useRefreshOnFocus } from '$libs/react-query/use-refetch-on-screen-focus';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { useMapTripsQuery } from '$apis/trips';
import { IDUnion } from '$models/id';

import MapViewDirections from 'react-native-maps-directions';
import { dropoffToLatlng, pickupToLatlng } from '$helpers/pickup-dropoff-to-latlng';
import { GOOGLE_SERVICES_API } from '@env';
import { Trip } from '$components/dumb/trip';
import { MapTrip } from '$components/dumb/map-trip';
import { toTripRoute } from '$fragments/trip-route';

export type MainHomeScreenProps = {
  //
};

export const MainHomeScreen: React.FC<MainHomeScreenProps> = () => {
  const mapRef = useRef<MapView>(null);

  const [focusedTripId, setFocusedTripId] = useState<IDUnion | undefined>();
  const [mapBoundaries, setMapBoundaries] = useState<{
    topLeft: LatLng;
    topRight: LatLng;
    bottomLeft: LatLng;
    bottomRight: LatLng;
  }>();

  const tripsQuery = useMapTripsQuery({
    tripsQueryFilters: {
      boundaries: mapBoundaries,
    },
  });

  useRefreshOnFocus(tripsQuery.refetch);

  const trips = tripsQuery.data?.trips.items;

  type SingleTrip = Exclude<typeof trips, undefined>[number];

  const [mapRegion, setMapRegion] = useAtom(mapRegionAtom);
  const colorSchema = useAppColorSchema();

  const onMarkerClick = useCallback((trip: SingleTrip) => {
    setFocusedTripId(trip.id);

    mapRef.current?.fitToCoordinates([pickupToLatlng(trip), dropoffToLatlng(trip)]);
  }, []);

  const calculateAndSetBoundaries = useCallback(async () => {
    const mapBoundaries = await mapRef.current?.getMapBoundaries();

    if (!mapBoundaries) return;

    setMapBoundaries({
      topLeft: {
        latitude: mapBoundaries.northEast.latitude,
        longitude: mapBoundaries.southWest.longitude,
      },
      topRight: mapBoundaries.northEast,
      bottomLeft: mapBoundaries.southWest,
      bottomRight: {
        latitude: mapBoundaries.southWest.latitude,
        longitude: mapBoundaries.northEast.longitude,
      },
    });
  }, []);

  const handleRegionChangeComplete = useCallback(
    async (region: Region, _details: Details) => {
      setMapRegion(region);
      calculateAndSetBoundaries();
    },
    [setMapRegion, calculateAndSetBoundaries]
  );

  const tripsMarkers = useMemo(
    () =>
      trips?.map(trip => (
        <MapTrip
          key={trip.id}
          {...toTripRoute(trip)}
          onPickupMarkerClick={() => onMarkerClick(trip)}
          onDropoffMarkerClick={() => onMarkerClick(trip)}
        />
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
        ref={mapRef}
        style={commonStyles.flexFull}
        initialRegion={mapRegion}
        userInterfaceStyle={colorSchema}
        onRegionChangeComplete={handleRegionChangeComplete}
        rotateEnabled={false}
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
