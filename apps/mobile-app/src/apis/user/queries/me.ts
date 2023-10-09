import { graphql } from '$gql';

export const meDocument = graphql(`
  query MeQuery {
    me {
      id
      email
      phone
      role
    }
  }
`);
