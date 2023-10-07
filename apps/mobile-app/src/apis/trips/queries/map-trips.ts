import { graphql } from '$gql';

export const mapTripsDocument = graphql(`
  query MapTripsQuery($tripsQueryMeta: MetaRequest!) {
    trips(meta: $tripsQueryMeta) {
      items {
        id
        capacity
        occupiedSeats
        status
        seatsStatus
        type
        createdById
        plannedAt

        timeline {
          id
          latitude
          longitude
          occupiedSeats
          status
        }

        passengers {
          id
          email
          phone
        }

        reservations {
          userId
          poolerType
          requestedSeatsCount
        }

        driver {
          id
          email
          phone
        }

        pickupAddress {
          addressLineOne
          addressLineTwo
          area
          city
          country
          postCode
        }
        pickupLatitude
        pickupLongitude

        dropoffAddress {
          addressLineOne
          addressLineTwo
          area
          city
          country
          postCode
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
