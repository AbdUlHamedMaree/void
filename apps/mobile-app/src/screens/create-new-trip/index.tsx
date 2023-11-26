import { commonStyles } from '$styles/common';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, IconButton, SegmentedButtons } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { DateTimeField } from '$components/fields/date-time';
import { TextField } from '$components/fields/text';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import { PaperBottomSheet } from '$components/dumb/paper-bottom-sheet';
import { useAtomValue } from 'jotai';
import { mapRegionAtom } from '$atoms/map-region';
import { spacing } from '$theme/spacing';
import { TripMapMarkerCard } from '$components/dumb/trip-map-marker-card';
import Geocoder from 'react-native-geocoding';
import { number, object, string, date, coerce } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createKeyGetter } from '$libs/react-hook-form/create-key-getter';
import { getAddressComponent } from '$libs/geocoding/get-adress-component';
import { MaskedTextField } from '$components/fields/masked-text';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { useAppTheme } from '$theme/hook';
import { useCreateTripMutation } from '$apis/trips';
import { toast } from '$modules/react-native-paper-toast';
import { MaterialCommunityIcon } from '$components/icons';

const addressValidation = object({
  addressLineOne: string(),
  addressLineTwo: string(),
  area: string(),
  city: string(),
  country: string(),
  postCode: string(),
});

const validationSchema = object({
  pickupLatitude: number(),
  pickupLongitude: number(),
  pickupAddress: addressValidation,

  dropoffLatitude: number(),
  dropoffLongitude: number(),
  dropoffAddress: addressValidation,

  capacity: coerce.number(),
  plannedAt: date().min(new Date()),
  // type: union([literal('one-time'), literal('routine')]),
});

type ValidationSchema = Zod.infer<typeof validationSchema>;

const key = createKeyGetter<ValidationSchema>();

export type CreateNewTripScreenProps = {
  children?: React.ReactNode;
};

export const CreateNewTripScreen: React.FC<CreateNewTripScreenProps> = () => {
  const { navigate, goBack } = useNavigation();

  const createTripMutation = useCreateTripMutation();

  const theme = useAppTheme();
  const initialMapRegion = useAtomValue(mapRegionAtom);

  const bottomSheetRef = useRef<React.ComponentRef<typeof PaperBottomSheet>>(null);

  const [activeButton, setActiveButton] = useState<'pickup' | 'dropoff'>('pickup');

  const methods = useForm<ValidationSchema>({
    defaultValues: {
      pickupLatitude: null,
      pickupLongitude: null,
      pickupAddress: null,

      dropoffLatitude: null,
      dropoffLongitude: null,
      dropoffAddress: null,

      capacity: null,
      plannedAt: null,
    } as any,
    resolver: zodResolver(validationSchema),
  });

  const { getValues, setValue, watch, resetField } = methods;

  const onSubmit = methods.handleSubmit(async data => {
    try {
      await createTripMutation.mutateAsync({
        createTripPayload: {
          ...data,
          type: 'in_app',
          category: 'one_time',
        },
      });
      navigate('Main', { screen: 'Home', params: {} });
      toast.success('Trip created successfully!');
    } catch (err) {
      console.error(err);
    }
  });

  const snapPoints = useMemo(() => ['8%', '60%'], []);

  const [pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude] = watch([
    'pickupLatitude',
    'pickupLongitude',
    'dropoffLatitude',
    'dropoffLongitude',
  ]);

  const pickupLocation = useMemo(
    () =>
      pickupLatitude && pickupLongitude
        ? { latitude: pickupLatitude, longitude: pickupLongitude }
        : undefined,
    [pickupLatitude, pickupLongitude]
  );

  const dropoffLocation = useMemo(
    () =>
      dropoffLatitude && dropoffLongitude
        ? { latitude: dropoffLatitude, longitude: dropoffLongitude }
        : undefined,
    [dropoffLatitude, dropoffLongitude]
  );

  const onMapPress = useCallback(
    ({ nativeEvent: { coordinate } }: MapPressEvent) => {
      if (activeButton === 'pickup') {
        setValue('pickupLatitude', coordinate.latitude);
        setValue('pickupLongitude', coordinate.longitude);
        resetField('pickupAddress');
      } else {
        setValue('dropoffLatitude', coordinate.latitude);
        setValue('dropoffLongitude', coordinate.longitude);
        resetField('dropoffAddress');
        setTimeout(() => bottomSheetRef.current?.snapToIndex(1), 200);
      }
      setActiveButton(v => (v === 'pickup' ? 'dropoff' : 'pickup'));
    },
    [activeButton, resetField, setValue]
  );

  const onSnapChange = useCallback(
    (index: number) => {
      // if not open, stop.
      if (index !== 1) return;

      const pickupAddress = getValues('pickupAddress');
      const dropoffAddress = getValues('dropoffAddress');

      if (!pickupAddress && pickupLocation)
        Geocoder.from(pickupLocation)
          .then(response => setValue('pickupAddress', getAddress(response)))
          .catch(err => console.error(err));

      if (!dropoffAddress && dropoffLocation)
        Geocoder.from(dropoffLocation)
          .then(response => setValue('dropoffAddress', getAddress(response)))
          .catch(err => console.error(err));
    },
    [dropoffLocation, pickupLocation, getValues, setValue]
  );

  return (
    <ScreenWrapper disablePadding>
      <MapView
        style={[commonStyles.flexFull]}
        initialRegion={initialMapRegion}
        onPress={onMapPress}
      >
        {pickupLocation && (
          <Marker coordinate={pickupLocation}>
            <TripMapMarkerCard>
              <MaterialCommunityIcon name='car' size={18} />
            </TripMapMarkerCard>
          </Marker>
        )}
        {dropoffLocation && (
          <Marker coordinate={dropoffLocation}>
            <TripMapMarkerCard>
              <MaterialCommunityIcon name='flag-checkered' size={18} />
            </TripMapMarkerCard>
          </Marker>
        )}
        {/* {pickupLocation && dropoffLocation && (
          <MapViewDirections
            origin={pickupLocation}
            destination={dropoffLocation}
            apikey={GOOGLE_SERVICES_API}
            strokeWidth={4}
            strokeColor='#0005'
          />
        )} */}
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
      <IconButton
        icon='arrow-left'
        mode='contained'
        onPress={() => goBack()}
        style={{ position: 'absolute', left: 8, top: 8 }}
      />

      <PaperBottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={onSnapChange}
      >
        <SafeAreaView
          style={[
            commonStyles.flexFull,
            commonStyles.screenPadding,
            { rowGap: spacing.sm },
          ]}
        >
          <FormProvider {...methods}>
            <TextField
              label='Pickup'
              name={key('pickupAddress.addressLineOne')}
              disabled
            />

            <TextField
              label='Dropoff'
              name={key('dropoffAddress.addressLineOne')}
              disabled
            />

            <MaskedTextField
              label='Capacity'
              name={key('capacity')}
              mask='99'
              keyboardType='number-pad'
            />

            <DateTimeField name={key('plannedAt')} label='Planned At' />

            {/* <RadioButtonGroupField name={key('type')}>
              <RadioButton.Item label='One time trip' value='one-time' />
              <RadioButton.Item label='Routine trip' value='routine' />
            </RadioButtonGroupField> */}

            <View style={{ flex: 1 }} />

            <Button
              mode='contained'
              onPress={onSubmit}
              loading={createTripMutation.isPending}
              disabled={createTripMutation.isPending}
            >
              Create
            </Button>
          </FormProvider>
        </SafeAreaView>
      </PaperBottomSheet>
    </ScreenWrapper>
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

const getAddress = (response: Geocoder.GeocoderResponse) => ({
  country: getAddressComponent(response, 'country'),
  city: getAddressComponent(response, 'locality'),
  area: getAddressComponent(
    response,
    'sublocality',
    getAddressComponent(response, 'neighborhood')
  ),
  addressLineOne: response.results[0].formatted_address,
  addressLineTwo: response.results[0].formatted_address,
  postCode: 'UNKNOWN',
});
