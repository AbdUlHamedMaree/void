import MapView, { BoundingBox, Details, Polygon, Region } from 'react-native-maps';
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
import { useGetRegionBoundaries } from '$hooks/use-get-region-boundaries';

export type MainHomeScreenProps = {
  //
};

export const MainHomeScreen: React.FC<MainHomeScreenProps> = () => {
  const mapRef = useRef<MapView>(null);
  const getRegionBoundaries = useGetRegionBoundaries();

  const [focusedTripId, setFocusedTripId] = useState<IDUnion | undefined>();
  const [mapBoundaries, setMapBoundaries] = useState<BoundingBox>();

  const tripsQuery = useMapTripsQuery({
    tripsQueryFilters: {
      // boundaries: mapBoundaries,
    },
  });

  useRefreshOnFocus(tripsQuery.refetch);

  const trips = tripsQuery.data?.trips.items;

  const [mapRegion, setMapRegion] = useAtom(mapRegionAtom);
  const colorSchema = useAppColorSchema();

  const onMarkerClick = useCallback((id: IDUnion) => setFocusedTripId(id), []);

  const box = useMemo(() => {
    if (!mapBoundaries) return;

    const { eastLongitude, northLatitude, southLatitude, westLongitude } =
      getRegionBoundaries(mapRegion);

    // return [
    //   { latitude: northLatitude, longitude: westLongitude },
    //   { latitude: northLatitude, longitude: eastLongitude },
    //   { latitude: southLatitude, longitude: eastLongitude },
    //   { latitude: southLatitude, longitude: westLongitude },
    // ];

    return [mapBoundaries?.northEast, mapBoundaries?.southWest];
  }, [getRegionBoundaries, mapBoundaries, mapRegion]);

  const calculateAndSetBoundaries = useCallback(async (region: Region) => {
    const a = await mapRef.current?.getMapBoundaries();

    if (!a) return;

    setMapBoundaries(a);

    // setMapBoundaries({
    //   left: topLeft,
    //   top: topRight,
    //   right: bottomLeft,
    //   bottom: bottomRight,
    // });
  }, []);

  const handleRegionChangeComplete = useCallback(
    async (region: Region, _details: Details) => {
      setMapRegion(region);
      calculateAndSetBoundaries(region);
    },
    [setMapRegion, calculateAndSetBoundaries]
  );

  const tripsMarkers = useMemo(
    () =>
      trips?.map(trip => (
        <MapTrip
          key={trip.id}
          {...toTripRoute(trip)}
          onPickupMarkerClick={() => onMarkerClick(trip.id)}
          onDropoffMarkerClick={() => onMarkerClick(trip.id)}
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
      >
        {tripsMarkers}
        {focusedTripMapViewDirections}
        {box && <Polygon coordinates={box} />}
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
