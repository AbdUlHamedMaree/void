import { graphql } from '$gql';

export const loginDocument = graphql(`
  mutation LoginMutation($loginPayload: LoginPayloadIt!) {
    login(payload: $loginPayload) {
      accessToken
      refreshToken
    }
  }
`);
