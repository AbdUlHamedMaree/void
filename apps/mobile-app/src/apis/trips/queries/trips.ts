import { graphql } from '$gql';

export const tripsDocument = graphql(`
  query TripsQuery($tripsQueryMeta: MetaRequest!) {
    trips(meta: $tripsQueryMeta) {
      items {
        id
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
      meta {
        limit
        page
        totalCount
        totalPages
      }
    }
  }
`);
