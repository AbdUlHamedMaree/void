/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateTripMutation($createTripPayload: CreateTripIt!) {\n    createTrip(payload: $createTripPayload) {\n      id\n    }\n  }\n": types.CreateTripMutationDocument,
    "\n  query HomeTripsQuery($tripsQueryMeta: MetaRequest!) {\n    trips(meta: $tripsQueryMeta) {\n      items {\n        id\n        capacity\n        occupiedSeats\n        status\n        seatsStatus\n        type\n        createdById\n\n        timeline {\n          id\n          latitude\n          longitude\n          occupiedSeats\n          status\n        }\n\n        passengers {\n          id\n          email\n          phone\n        }\n\n        reservations {\n          userId\n          poolerType\n          requestedSeatsCount\n        }\n\n        driver {\n          id\n          email\n          phone\n        }\n\n        pickupAddress {\n          addressLineOne\n          addressLineTwo\n          area\n          city\n          country\n          postCode\n        }\n        pickupLatitude\n        pickupLongitude\n\n        dropoffAddress {\n          addressLineOne\n          addressLineTwo\n          area\n          city\n          country\n          postCode\n        }\n        dropoffLatitude\n        dropoffLongitude\n      }\n      meta {\n        limit\n        page\n        totalCount\n        totalPages\n      }\n    }\n  }\n": types.HomeTripsQueryDocument,
    "\n  mutation LoginMutation($loginPayload: LoginPayloadIt!) {\n    login(payload: $loginPayload) {\n      user {\n        id\n        email\n        phone\n        role\n      }\n      accessToken\n      refreshToken\n    }\n  }\n": types.LoginMutationDocument,
    "\n  mutation VeryOTPMutation($verifyOTPPayload: OtpVerificationPayloadIt!) {\n    verifyOtp(payload: $verifyOTPPayload) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        phone\n      }\n    }\n  }\n": types.VeryOtpMutationDocument,
    "\n  mutation SignUpMutation($signUpPayload: SignupAppUsersIt!) {\n    signup(payload: $signUpPayload) {\n      id\n    }\n  }\n": types.SignUpMutationDocument,
    "\n  mutation SendOTPMutation($sendOTPPayload: OtpLoginPayloadIt!) {\n    sendOtp(payload: $sendOTPPayload) {\n      message\n    }\n  }\n": types.SendOtpMutationDocument,
    "\n  query TripsTripsQuery($tripsQueryMeta: MetaRequest!) {\n    trips(meta: $tripsQueryMeta) {\n      items {\n        id\n        capacity\n        occupiedSeats\n        status\n        seatsStatus\n        type\n        createdById\n        plannedAt\n\n        timeline {\n          id\n          latitude\n          longitude\n          occupiedSeats\n          status\n        }\n\n        passengers {\n          id\n          email\n          phone\n        }\n\n        reservations {\n          userId\n          poolerType\n          requestedSeatsCount\n        }\n\n        driver {\n          id\n          email\n          phone\n        }\n\n        pickupAddress {\n          addressLineOne\n          addressLineTwo\n          area\n          city\n          country\n          postCode\n        }\n        pickupLatitude\n        pickupLongitude\n\n        dropoffAddress {\n          addressLineOne\n          addressLineTwo\n          area\n          city\n          country\n          postCode\n        }\n        dropoffLatitude\n        dropoffLongitude\n      }\n      meta {\n        limit\n        page\n        totalCount\n        totalPages\n      }\n    }\n  }\n": types.TripsTripsQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTripMutation($createTripPayload: CreateTripIt!) {\n    createTrip(payload: $createTripPayload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTripMutation($createTripPayload: CreateTripIt!) {\n    createTrip(payload: $createTripPayload) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query HomeTripsQuery($tripsQueryMeta: MetaRequest!) {\n    trips(meta: $tripsQueryMeta) {\n      items {\n        id\n        capacity\n        occupiedSeats\n        status\n        seatsStatus\n        type\n        createdById\n\n        timeline {\n          id\n          latitude\n          longitude\n          occupiedSeats\n          status\n        }\n\n        passengers {\n          id\n          email\n          phone\n        }\n\n        reservations {\n          userId\n          poolerType\n          requestedSeatsCount\n        }\n\n        driver {\n          id\n          email\n          phone\n        }\n\n        pickupAddress {\n          addressLineOne\n          addressLineTwo\n          area\n          city\n          country\n          postCode\n        }\n        pickupLatitude\n        pickupLongitude\n\n        dropoffAddress {\n          addressLineOne\n          addressLineTwo\n          area\n          city\n          country\n          postCode\n        }\n        dropoffLatitude\n        dropoffLongitude\n      }\n      meta {\n        limit\n        page\n        totalCount\n        totalPages\n      }\n    }\n  }\n"): (typeof documents)["\n  query HomeTripsQuery($tripsQueryMeta: MetaRequest!) {\n    trips(meta: $tripsQueryMeta) {\n      items {\n        id\n        capacity\n        occupiedSeats\n        status\n        seatsStatus\n        type\n        createdById\n\n        timeline {\n          id\n          latitude\n          longitude\n          occupiedSeats\n          status\n        }\n\n        passengers {\n          id\n          email\n          phone\n        }\n\n        reservations {\n          userId\n          poolerType\n          requestedSeatsCount\n        }\n\n        driver {\n          id\n          email\n          phone\n        }\n\n        pickupAddress {\n          addressLineOne\n          addressLineTwo\n          area\n          city\n          country\n          postCode\n        }\n        pickupLatitude\n        pickupLongitude\n\n        dropoffAddress {\n          addressLineOne\n          addressLineTwo\n          area\n          city\n          country\n          postCode\n        }\n        dropoffLatitude\n        dropoffLongitude\n      }\n      meta {\n        limit\n        page\n        totalCount\n        totalPages\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginMutation($loginPayload: LoginPayloadIt!) {\n    login(payload: $loginPayload) {\n      user {\n        id\n        email\n        phone\n        role\n      }\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation LoginMutation($loginPayload: LoginPayloadIt!) {\n    login(payload: $loginPayload) {\n      user {\n        id\n        email\n        phone\n        role\n      }\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VeryOTPMutation($verifyOTPPayload: OtpVerificationPayloadIt!) {\n    verifyOtp(payload: $verifyOTPPayload) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        phone\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation VeryOTPMutation($verifyOTPPayload: OtpVerificationPayloadIt!) {\n    verifyOtp(payload: $verifyOTPPayload) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        phone\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUpMutation($signUpPayload: SignupAppUsersIt!) {\n    signup(payload: $signUpPayload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation SignUpMutation($signUpPayload: SignupAppUsersIt!) {\n    signup(payload: $signUpPayload) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendOTPMutation($sendOTPPayload: OtpLoginPayloadIt!) {\n    sendOtp(payload: $sendOTPPayload) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation SendOTPMutation($sendOTPPayload: OtpLoginPayloadIt!) {\n    sendOtp(payload: $sendOTPPayload) {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TripsTripsQuery($tripsQueryMeta: MetaRequest!) {\n    trips(meta: $tripsQueryMeta) {\n      items {\n        id\n        capacity\n        occupiedSeats\n        status\n        seatsStatus\n        type\n        createdById\n        plannedAt\n\n        timeline {\n          id\n          latitude\n          longitude\n          occupiedSeats\n          status\n        }\n\n        passengers {\n          id\n          email\n          phone\n        }\n\n        reservations {\n          userId\n          poolerType\n          requestedSeatsCount\n        }\n\n        driver {\n          id\n          email\n          phone\n        }\n\n        pickupAddress {\n          addressLineOne\n          addressLineTwo\n          area\n          city\n          country\n          postCode\n        }\n        pickupLatitude\n        pickupLongitude\n\n        dropoffAddress {\n          addressLineOne\n          addressLineTwo\n          area\n          city\n          country\n          postCode\n        }\n        dropoffLatitude\n        dropoffLongitude\n      }\n      meta {\n        limit\n        page\n        totalCount\n        totalPages\n      }\n    }\n  }\n"): (typeof documents)["\n  query TripsTripsQuery($tripsQueryMeta: MetaRequest!) {\n    trips(meta: $tripsQueryMeta) {\n      items {\n        id\n        capacity\n        occupiedSeats\n        status\n        seatsStatus\n        type\n        createdById\n        plannedAt\n\n        timeline {\n          id\n          latitude\n          longitude\n          occupiedSeats\n          status\n        }\n\n        passengers {\n          id\n          email\n          phone\n        }\n\n        reservations {\n          userId\n          poolerType\n          requestedSeatsCount\n        }\n\n        driver {\n          id\n          email\n          phone\n        }\n\n        pickupAddress {\n          addressLineOne\n          addressLineTwo\n          area\n          city\n          country\n          postCode\n        }\n        pickupLatitude\n        pickupLongitude\n\n        dropoffAddress {\n          addressLineOne\n          addressLineTwo\n          area\n          city\n          country\n          postCode\n        }\n        dropoffLatitude\n        dropoffLongitude\n      }\n      meta {\n        limit\n        page\n        totalCount\n        totalPages\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;