import { atomWithStorage } from 'jotai/utils';
import { Region } from 'react-native-maps';

export const mapRegionAtom = atomWithStorage<Region>('map-region', {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
});
