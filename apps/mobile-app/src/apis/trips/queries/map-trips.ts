import { graphql } from '$gql';

export const mapTripsDocument = graphql(`
  query MapTripsQuery(
    $tripsQueryFilters: GetTripsFiltersIt
    $tripsQueryMeta: TripsMetaRequest
  ) {
    trips(filters: $tripsQueryFilters, meta: $tripsQueryMeta) {
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
