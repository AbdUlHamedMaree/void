import { graphql } from '$gql';

export const verifyOTPDocument = graphql(`
  mutation VeryOTPMutation($verifyOTPPayload: OtpVerificationPayloadIt!) {
    verifyOtp(payload: $verifyOTPPayload) {
      accessToken
      refreshToken
    }
  }
`);
