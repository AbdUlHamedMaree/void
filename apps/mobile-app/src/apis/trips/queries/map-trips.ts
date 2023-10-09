import { graphql } from '$gql';

export const mapTripsDocument = graphql(`
  query MapTripsQuery($tripsQueryMeta: MetaRequest!) {
    trips(meta: $tripsQueryMeta) {
      items {
        id
        capacity
        occupiedSeats
        plannedAt

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
      meta {
        limit
        page
        totalCount
        totalPages
      }
    }
  }
`);
