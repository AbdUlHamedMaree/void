import { graphql } from '$gql';

export const tripsDocument = graphql(`
  query TripsQuery(
    $tripsQueryFilters: GetTripsFiltersIt
    $tripsQueryMeta: TripsMetaRequest
  ) {
    trips(filters: $tripsQueryFilters, meta: $tripsQueryMeta) {
      items {
        id
        capacity
        occupiedSeats
        plannedAt
        passengers {
          id
        }

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
