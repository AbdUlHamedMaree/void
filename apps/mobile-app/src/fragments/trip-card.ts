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
