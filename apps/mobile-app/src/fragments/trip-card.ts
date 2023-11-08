import { graphql } from '$gql';
import { FragmentModel } from '$types/fragment-model';

export const TripCardFragment = graphql(`
  fragment TripCard on TripOt {
    capacity
    occupiedSeats
    plannedAt

    pickupAddress {
      addressLineOne
    }

    dropoffAddress {
      addressLineOne
    }
  }
`);

export type TripCardModel = FragmentModel<typeof TripCardFragment>;

export const toTripCard = (obj: TripCardModel): TripCardModel => ({
  capacity: obj.capacity,
  occupiedSeats: obj.occupiedSeats,
  plannedAt: obj.plannedAt,

  pickupAddress: {
    addressLineOne: obj.pickupAddress.addressLineOne,
  },

  dropoffAddress: {
    addressLineOne: obj.dropoffAddress.addressLineOne,
  },
});
