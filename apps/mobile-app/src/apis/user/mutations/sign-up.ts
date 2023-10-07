import { graphql } from '$gql';

export const signUpDocument = graphql(`
  mutation SignUpMutation($signUpPayload: SignupAppUsersIt!) {
    signup(payload: $signUpPayload) {
      id
    }
  }
`);
