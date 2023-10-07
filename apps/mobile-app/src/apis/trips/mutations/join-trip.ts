import { graphql } from '$gql';

export const joinTripDocument = graphql(`
  mutation JoinTripMutation($joinTripId: Float!, $joinTripPayload: JoinTripIt!) {
    joinTrip(id: $joinTripId, payload: $joinTripPayload) {
      id
    }
  }
`);
