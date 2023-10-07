import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { TripsStackScreenProps } from '$navigation/main/trips/model';
import { Text } from 'react-native-paper';

export type SingleTripsScreenProps = {
  //
};

export const SingleTripsScreen: React.FC<SingleTripsScreenProps> = () => {
  const {
    params: { id },
  } = useRoute<TripsStackScreenProps<'Single'>['route']>();

  return (
    <ScreenWrapper>
      <Text>Single Trip {id}</Text>
    </ScreenWrapper>
  );
};
