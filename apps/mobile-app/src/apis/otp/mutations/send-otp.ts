import { graphql } from '$gql';

export const sendOTPDocument = graphql(`
  mutation SendOTPMutation($sendOTPPayload: OtpLoginPayloadIt!) {
    sendOtp(payload: $sendOTPPayload) {
      message
    }
  }
`);
