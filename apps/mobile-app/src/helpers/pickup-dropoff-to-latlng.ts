import { LatLng } from 'react-native-maps';

export const pickupDropoffToLatlng = (obj: {
  pickupLatitude: number;
  pickupLongitude: number;
  dropoffLatitude: number;
  dropoffLongitude: number;
}) => ({
  pickup: pickupToLatlng(obj),
  dropoff: dropoffToLatlng(obj),
});

export const pickupToLatlng = ({
  pickupLatitude,
  pickupLongitude,
}: {
  pickupLatitude: number;
  pickupLongitude: number;
}): LatLng => ({ latitude: pickupLatitude, longitude: pickupLongitude });

export const dropoffToLatlng = ({
  dropoffLatitude,
  dropoffLongitude,
}: {
  dropoffLatitude: number;
  dropoffLongitude: number;
}): LatLng => ({ latitude: dropoffLatitude, longitude: dropoffLongitude });
