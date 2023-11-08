import { getRegionBoundaries } from '$helpers/location';
import { useCallback } from 'react';
import { useWindowDimensions } from 'react-native';
import { Region } from 'react-native-maps';

export const useGetRegionBoundaries = () => {
  const window = useWindowDimensions();

  return useCallback((region: Region) => getRegionBoundaries(region, window), [window]);
};
