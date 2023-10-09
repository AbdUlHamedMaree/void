import { atomWithMMKV } from '$libs/jotai/atom-with-mmkv';
import { Region } from 'react-native-maps';

// dubai initial location
export const mapRegionAtom = atomWithMMKV<Region>('map-region', {
  longitudeDelta: 0.15110325068235397,
  latitudeDelta: 0.1793406486560123,
  longitude: 55.26689613237977,
  latitude: 25.212185223887573,
});
