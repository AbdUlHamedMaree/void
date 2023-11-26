import { graphql } from '$gql';

export const singleTripDocument = graphql(`
  query SingleTripQuery($singleTripId: Float!) {
    trip(id: $singleTripId) {
      id
      capacity
      occupiedSeats
      plannedAt

      driverId
      passengers {
        id
      }

      pickupAddress {
        addressLineOne
      }
      pickupLatitude
      pickupLongitude

      dropoffAddress {
        addressLineOne
      }
      dropoffLatitude
      dropoffLongitude
    }
  }
`);
