import { graphql } from '$gql';

export const createTripDocument = graphql(`
  mutation CreateTripMutation($createTripPayload: CreateTripIt!) {
    createTrip(payload: $createTripPayload) {
      id
    }
  }
`);
