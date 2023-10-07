import { graphql } from '$gql';

export const loginDocument = graphql(`
  mutation LoginMutation($loginPayload: LoginPayloadIt!) {
    login(payload: $loginPayload) {
      user {
        id
        email
        phone
        role
      }
      accessToken
      refreshToken
    }
  }
`);
