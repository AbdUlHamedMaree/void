import { graphql } from '$gql';
import { FragmentModel } from '$types/fragment-model';

export const TripRouteFragment = graphql(`
  fragment TripRoute on TripOt {
    pickupLatitude
    pickupLongitude

    dropoffLatitude
    dropoffLongitude
  }
`);

export type TripRouteModel = FragmentModel<typeof TripRouteFragment>;

export const toTripRoute = (obj: TripRouteModel): TripRouteModel => ({
  pickupLatitude: obj.pickupLatitude,
  pickupLongitude: obj.pickupLongitude,
  dropoffLatitude: obj.dropoffLatitude,
  dropoffLongitude: obj.dropoffLongitude,
});
