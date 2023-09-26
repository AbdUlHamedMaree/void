/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AppUsersEntity = {
  __typename?: 'AppUsersEntity';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  documents?: Maybe<Array<UserDocumentsEntity>>;
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
  vehicle?: Maybe<VehiclesEntity>;
};

export type AppUsersOt = {
  __typename?: 'AppUsersOt';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  documents?: Maybe<Array<UserDocumentsEntity>>;
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
  vehicle?: Maybe<VehiclesEntity>;
};

export type CreateAppUsersIt = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type CreateTripIt = {
  capacity: Scalars['Float']['input'];
  dropoffAddress: TripAddressIt;
  dropoffLatitude: Scalars['Float']['input'];
  dropoffLongitude: Scalars['Float']['input'];
  pickupAddress: TripAddressIt;
  pickupLatitude: Scalars['Float']['input'];
  pickupLongitude: Scalars['Float']['input'];
  plannedAt: Scalars['DateTime']['input'];
  type: Scalars['String']['input'];
};

export type GetTripsOt = {
  __typename?: 'GetTripsOt';
  items: Array<TripOt>;
  meta: MetaResponse;
};

export type JoinTripIt = {
  poolerType: Scalars['String']['input'];
  requestedSeatsCount: Scalars['Float']['input'];
};

export type LoginPayloadIt = {
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type LoginResponseOt = {
  __typename?: 'LoginResponseOt';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: AppUsersOt;
};

export type MessageResponseOt = {
  __typename?: 'MessageResponseOt';
  message: Scalars['String']['output'];
};

export type MetaRequest = {
  /** This key will be mandatory if sorting is required against a join relation */
  entityAlias?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type MetaResponse = {
  __typename?: 'MetaResponse';
  limit?: Maybe<Scalars['Float']['output']>;
  page?: Maybe<Scalars['Float']['output']>;
  totalCount?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTrip: TripsEntity;
  createUser: AppUsersOt;
  getNewTokens: LoginResponseOt;
  joinTrip: TripsEntity;
  login: LoginResponseOt;
  resendOtp: MessageResponseOt;
  sendOtp: MessageResponseOt;
  signup: AppUsersOt;
  verifyOtp: LoginResponseOt;
};


export type MutationCreateTripArgs = {
  payload: CreateTripIt;
};


export type MutationCreateUserArgs = {
  payload: CreateAppUsersIt;
};


export type MutationJoinTripArgs = {
  id: Scalars['Float']['input'];
  payload: JoinTripIt;
};


export type MutationLoginArgs = {
  payload: LoginPayloadIt;
};


export type MutationResendOtpArgs = {
  payload: OtpLoginPayloadIt;
};


export type MutationSendOtpArgs = {
  payload: OtpLoginPayloadIt;
};


export type MutationSignupArgs = {
  payload: SignupAppUsersIt;
};


export type MutationVerifyOtpArgs = {
  payload: OtpVerificationPayloadIt;
};

export type OtpLoginPayloadIt = {
  phone: Scalars['String']['input'];
};

export type OtpVerificationPayloadIt = {
  otp: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  trips: GetTripsOt;
  users: Array<AppUsersOt>;
};


export type QueryTripsArgs = {
  meta?: InputMaybe<MetaRequest>;
};

export type SignupAppUsersIt = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type TripAddressIt = {
  addressLineOne?: InputMaybe<Scalars['String']['input']>;
  addressLineTwo?: InputMaybe<Scalars['String']['input']>;
  area?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  postCode?: InputMaybe<Scalars['String']['input']>;
};

export type TripAddressOt = {
  __typename?: 'TripAddressOt';
  addressLineOne?: Maybe<Scalars['String']['output']>;
  addressLineTwo?: Maybe<Scalars['String']['output']>;
  area?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  postCode?: Maybe<Scalars['String']['output']>;
};

export type TripOt = {
  __typename?: 'TripOt';
  capacity?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['Float']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  driver?: Maybe<AppUsersEntity>;
  driverId?: Maybe<Scalars['Float']['output']>;
  dropoffAddress: TripAddressOt;
  dropoffLatitude: Scalars['Float']['output'];
  dropoffLongitude: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  occupiedSeats?: Maybe<Scalars['Float']['output']>;
  passengers?: Maybe<Array<AppUsersEntity>>;
  pickupAddress: TripAddressOt;
  pickupLatitude: Scalars['Float']['output'];
  pickupLongitude: Scalars['Float']['output'];
  plannedAt: Scalars['DateTime']['output'];
  reservations?: Maybe<Array<TripReservationOt>>;
  riders: Array<AppUsersEntity>;
  seatsStatus: Scalars['String']['output'];
  status: Scalars['String']['output'];
  timeline?: Maybe<Array<TripsTimelineEntity>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type TripReservationOt = {
  __typename?: 'TripReservationOt';
  createdAt?: Maybe<Scalars['String']['output']>;
  poolerType: Scalars['String']['output'];
  requestedSeatsCount: Scalars['Float']['output'];
  userId: Scalars['Float']['output'];
};

export type TripsEntity = {
  __typename?: 'TripsEntity';
  capacity?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['Float']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  driver?: Maybe<AppUsersEntity>;
  driverId?: Maybe<Scalars['Float']['output']>;
  dropoffAddress: TripAddressOt;
  dropoffLatitude: Scalars['Float']['output'];
  dropoffLongitude: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  occupiedSeats?: Maybe<Scalars['Float']['output']>;
  passengers?: Maybe<Array<AppUsersEntity>>;
  pickupAddress: TripAddressOt;
  pickupLatitude: Scalars['Float']['output'];
  pickupLongitude: Scalars['Float']['output'];
  plannedAt: Scalars['DateTime']['output'];
  reservations?: Maybe<Array<TripReservationOt>>;
  riders: Array<AppUsersEntity>;
  seatsStatus: Scalars['String']['output'];
  status: Scalars['String']['output'];
  timeline?: Maybe<Array<TripsTimelineEntity>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type TripsTimelineEntity = {
  __typename?: 'TripsTimelineEntity';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  occupiedSeats?: Maybe<Scalars['Float']['output']>;
  status: Scalars['String']['output'];
  trip?: Maybe<TripsEntity>;
  tripId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserDocumentsEntity = {
  __typename?: 'UserDocumentsEntity';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  expiryDate: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  issuer: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  user: AppUsersEntity;
  userId: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type VehiclesEntity = {
  __typename?: 'VehiclesEntity';
  brand: Scalars['String']['output'];
  capacity: Scalars['Float']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  driver: AppUsersEntity;
  driverId: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  image?: Maybe<Scalars['String']['output']>;
  insuranceExpiryDate: Scalars['DateTime']['output'];
  model: Scalars['String']['output'];
  name: Scalars['String']['output'];
  plateNumber: Scalars['String']['output'];
  registrationExpiryDate: Scalars['DateTime']['output'];
  registrationNumber: Scalars['String']['output'];
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type CreateTripMutationMutationVariables = Exact<{
  createTripPayload: CreateTripIt;
}>;


export type CreateTripMutationMutation = { __typename?: 'Mutation', createTrip: { __typename?: 'TripsEntity', id: number } };

export type HomeTripsQueryQueryVariables = Exact<{
  tripsQueryMeta: MetaRequest;
}>;


export type HomeTripsQueryQuery = { __typename?: 'Query', trips: { __typename?: 'GetTripsOt', items: Array<{ __typename?: 'TripOt', id: number, capacity?: number | null, occupiedSeats?: number | null, status: string, seatsStatus: string, type: string, createdById: number, pickupLatitude: number, pickupLongitude: number, dropoffLatitude: number, dropoffLongitude: number, timeline?: Array<{ __typename?: 'TripsTimelineEntity', id: number, latitude: number, longitude: number, occupiedSeats?: number | null, status: string }> | null, passengers?: Array<{ __typename?: 'AppUsersEntity', id: number, email: string, phone: string }> | null, reservations?: Array<{ __typename?: 'TripReservationOt', userId: number, poolerType: string, requestedSeatsCount: number }> | null, driver?: { __typename?: 'AppUsersEntity', id: number, email: string, phone: string } | null, pickupAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null, addressLineTwo?: string | null, area?: string | null, city?: string | null, country?: string | null, postCode?: string | null }, dropoffAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null, addressLineTwo?: string | null, area?: string | null, city?: string | null, country?: string | null, postCode?: string | null } }>, meta: { __typename?: 'MetaResponse', limit?: number | null, page?: number | null, totalCount?: number | null, totalPages?: number | null } } };

export type LoginMutationMutationVariables = Exact<{
  loginPayload: LoginPayloadIt;
}>;


export type LoginMutationMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponseOt', accessToken: string, refreshToken: string, user: { __typename?: 'AppUsersOt', id: number, email: string, phone: string, role: string } } };

export type VeryOtpMutationMutationVariables = Exact<{
  verifyOTPPayload: OtpVerificationPayloadIt;
}>;


export type VeryOtpMutationMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'LoginResponseOt', accessToken: string, refreshToken: string, user: { __typename?: 'AppUsersOt', id: number, email: string, phone: string } } };

export type SignUpMutationMutationVariables = Exact<{
  signUpPayload: SignupAppUsersIt;
}>;


export type SignUpMutationMutation = { __typename?: 'Mutation', signup: { __typename?: 'AppUsersOt', id: number } };

export type SendOtpMutationMutationVariables = Exact<{
  sendOTPPayload: OtpLoginPayloadIt;
}>;


export type SendOtpMutationMutation = { __typename?: 'Mutation', sendOtp: { __typename?: 'MessageResponseOt', message: string } };

export type TripsTripsQueryQueryVariables = Exact<{
  tripsQueryMeta: MetaRequest;
}>;


export type TripsTripsQueryQuery = { __typename?: 'Query', trips: { __typename?: 'GetTripsOt', items: Array<{ __typename?: 'TripOt', id: number, capacity?: number | null, occupiedSeats?: number | null, status: string, seatsStatus: string, type: string, createdById: number, plannedAt: any, pickupLatitude: number, pickupLongitude: number, dropoffLatitude: number, dropoffLongitude: number, timeline?: Array<{ __typename?: 'TripsTimelineEntity', id: number, latitude: number, longitude: number, occupiedSeats?: number | null, status: string }> | null, passengers?: Array<{ __typename?: 'AppUsersEntity', id: number, email: string, phone: string }> | null, reservations?: Array<{ __typename?: 'TripReservationOt', userId: number, poolerType: string, requestedSeatsCount: number }> | null, driver?: { __typename?: 'AppUsersEntity', id: number, email: string, phone: string } | null, pickupAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null, addressLineTwo?: string | null, area?: string | null, city?: string | null, country?: string | null, postCode?: string | null }, dropoffAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null, addressLineTwo?: string | null, area?: string | null, city?: string | null, country?: string | null, postCode?: string | null } }>, meta: { __typename?: 'MetaResponse', limit?: number | null, page?: number | null, totalCount?: number | null, totalPages?: number | null } } };


export const CreateTripMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTripMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createTripPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTripIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTrip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createTripPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTripMutationMutation, CreateTripMutationMutationVariables>;
export const HomeTripsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomeTripsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryMeta"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MetaRequest"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"meta"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryMeta"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"seatsStatus"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"timeline"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passengers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reservations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"poolerType"}},{"kind":"Field","name":{"kind":"Name","value":"requestedSeatsCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pickupAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}},{"kind":"Field","name":{"kind":"Name","value":"addressLineTwo"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"postCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pickupLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"pickupLongitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}},{"kind":"Field","name":{"kind":"Name","value":"addressLineTwo"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"postCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLongitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<HomeTripsQueryQuery, HomeTripsQueryQueryVariables>;
export const LoginMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginPayloadIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutationMutation, LoginMutationMutationVariables>;
export const VeryOtpMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VeryOTPMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verifyOTPPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpVerificationPayloadIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verifyOTPPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]}}]} as unknown as DocumentNode<VeryOtpMutationMutation, VeryOtpMutationMutationVariables>;
export const SignUpMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUpMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signUpPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupAppUsersIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signUpPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SignUpMutationMutation, SignUpMutationMutationVariables>;
export const SendOtpMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendOTPMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendOTPPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpLoginPayloadIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendOTPPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SendOtpMutationMutation, SendOtpMutationMutationVariables>;
export const TripsTripsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TripsTripsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryMeta"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MetaRequest"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"meta"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryMeta"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"seatsStatus"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"plannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"timeline"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passengers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reservations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"poolerType"}},{"kind":"Field","name":{"kind":"Name","value":"requestedSeatsCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pickupAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}},{"kind":"Field","name":{"kind":"Name","value":"addressLineTwo"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"postCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pickupLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"pickupLongitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}},{"kind":"Field","name":{"kind":"Name","value":"addressLineTwo"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"postCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLongitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<TripsTripsQueryQuery, TripsTripsQueryQueryVariables>;