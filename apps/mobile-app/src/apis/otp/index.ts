import { createGraphQLCRUDEntity } from '$libs/graphql-react-query/create-graphql-crud-entity';
import { sendOTPDocument } from './mutations/send-otp';
import { verifyOTPDocument } from './mutations/verify-otp';

export const {
  queries: _,
  mutations: [useSendOtpMutation, useVerifyOTPMutation],
} = createGraphQLCRUDEntity()(sendOTPDocument, verifyOTPDocument);
