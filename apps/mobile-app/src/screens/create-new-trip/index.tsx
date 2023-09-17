import { commonStyles } from '$styles/common';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, SegmentedButtons, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { DateTimeField, dateTimeRegex } from '$components/fields/date-time';
import { TextField } from '$components/fields/text';
import React, { useCallback, useMemo, useState } from 'react';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { PaperBottomSheet } from '$components/dumb/paper-bottom-sheet';
import { useAtomValue } from 'jotai';
import { mapRegionAtom } from '$atoms/map-region';
import { spacing } from '$theme/spacing';
import { TripMapMarkerCard } from '$components/dumb/trip-map-marker-card';
import Geocoder from 'react-native-geocoding';

export type CreateNewTripScreenProps = {
  children?: React.ReactNode;
};

export const CreateNewTripScreen: React.FC<CreateNewTripScreenProps> = () => {
  const theme = useTheme();
  const initialMapRegion = useAtomValue(mapRegionAtom);

  const [activeButton, setActiveButton] = useState<'pickup' | 'dropoff'>('pickup');
  const [pickupLocation, setPickupLocation] = useState<LatLng>();
  const [dropoffLocation, setDropoffLocation] = useState<LatLng>();

  const methods = useForm({
    defaultValues: {
      pickup: '',
      dropoff: '',
      at: null as Date | string | null,
    },
  });

  const { getValues, setValue } = methods;

  const onSubmit = methods.handleSubmit(data => console.log(data));

  const snapPoints = useMemo(() => [30, '80%'], []);

  const onSnapChange = useCallback(
    (index: number) => {
      const values = getValues();

      if (index !== 1)
        // if not open, stop.
        return;
      if (values.pickup === '' && pickupLocation)
        Geocoder.from(pickupLocation)
          .then(date => {
            const result = date.results[0];

            setValue('pickup', result.formatted_address);
          })
          .catch(err => console.error(err));

      if (values.dropoff === '' && dropoffLocation)
        Geocoder.from(dropoffLocation)
          .then(date => {
            const result = date.results[0];

            setValue('dropoff', result.formatted_address);
          })
          .catch(err => console.error(err));
    },
    [dropoffLocation, getValues, pickupLocation, setValue]
  );

  return (
    <SafeAreaView style={[commonStyles.flexFull]}>
      <MapView
        style={[commonStyles.flexFull]}
        initialRegion={initialMapRegion}
        onPress={({ nativeEvent: { coordinate } }) => {
          activeButton === 'pickup'
            ? setPickupLocation(coordinate)
            : setDropoffLocation(coordinate);

          methods.setValue(activeButton, '');
        }}
      >
        {pickupLocation && (
          <Marker coordinate={pickupLocation}>
            <TripMapMarkerCard>
              <Text>Pickup</Text>
            </TripMapMarkerCard>
          </Marker>
        )}
        {dropoffLocation && (
          <Marker coordinate={dropoffLocation}>
            <TripMapMarkerCard>
              <Text>Drop off</Text>
            </TripMapMarkerCard>
          </Marker>
        )}
      </MapView>

      <View style={styles.segmentedButtonsContainer}>
        <SegmentedButtons
          onValueChange={str => setActiveButton(str as 'pickup')}
          value={activeButton}
          style={{
            width: 200,
            backgroundColor: theme.colors.elevation.level2,
            borderRadius: 50,
          }}
          buttons={[
            { label: 'Pickup', value: 'pickup' },
            { label: 'Drop off', value: 'dropoff' },
          ]}
        />
      </View>

      <PaperBottomSheet index={0} snapPoints={snapPoints} onChange={onSnapChange}>
        <SafeAreaView
          style={[
            commonStyles.flexFull,
            commonStyles.screenPadding,
            { rowGap: spacing.sm },
          ]}
        >
          <FormProvider {...methods}>
            <TextField label='Pickup' name='pickup' disabled />
            <TextField label='Dropoff' name='dropoff' disabled />

            <DateTimeField
              name='at'
              label='Date'
              rules={{
                required: 'Date is required!',
                pattern: {
                  message: 'not valid date',
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
      </PaperBottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  segmentedButtonsContainer: {
    position: 'absolute',
    top: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
