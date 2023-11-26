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
  password?: Maybe<Scalars['String']['output']>;
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
  password?: Maybe<Scalars['String']['output']>;
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
  category: Scalars['String']['input'];
  dropoffAddress: TripAddressIt;
  dropoffLatitude: Scalars['Float']['input'];
  dropoffLongitude: Scalars['Float']['input'];
  pickupAddress: TripAddressIt;
  pickupLatitude: Scalars['Float']['input'];
  pickupLongitude: Scalars['Float']['input'];
  plannedAt: Scalars['DateTime']['input'];
  type: Scalars['String']['input'];
};

export type GeoPointIt = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
};

export type GetTripsFiltersIt = {
  availableSeats?: InputMaybe<Scalars['Float']['input']>;
  boundaries?: InputMaybe<ScreenGpsBoundariesIt>;
  dropoffAreas?: InputMaybe<Array<Scalars['String']['input']>>;
  dropoffCities?: InputMaybe<Array<Scalars['String']['input']>>;
  dropoffCountries?: InputMaybe<Array<Scalars['String']['input']>>;
  dropoffPostcodes?: InputMaybe<Array<Scalars['String']['input']>>;
  dropoffStreets?: InputMaybe<Array<Scalars['String']['input']>>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  pickupAreas?: InputMaybe<Array<Scalars['String']['input']>>;
  pickupCities?: InputMaybe<Array<Scalars['String']['input']>>;
  pickupCountries?: InputMaybe<Array<Scalars['String']['input']>>;
  pickupPostcodes?: InputMaybe<Array<Scalars['String']['input']>>;
  pickupStreets?: InputMaybe<Array<Scalars['String']['input']>>;
  plannedAtFrom?: InputMaybe<Scalars['DateTime']['input']>;
  plannedAtTo?: InputMaybe<Scalars['DateTime']['input']>;
  startAtTo?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
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

export type MetaResponse = {
  __typename?: 'MetaResponse';
  limit?: Maybe<Scalars['Float']['output']>;
  page?: Maybe<Scalars['Float']['output']>;
  totalCount?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: TripChatOt;
  createTrip: TripsEntity;
  createUser: AppUsersOt;
  getNewTokens: LoginResponseOt;
  joinTrip: TripsEntity;
  leaveTrip: TripsEntity;
  login: LoginResponseOt;
  resendOtp: MessageResponseOt;
  sendMessage: TripChatOt;
  sendOtp: MessageResponseOt;
  signup: AppUsersOt;
  startTrip: TripsEntity;
  verifyOtp: LoginResponseOt;
};


export type MutationCreateChatArgs = {
  tripId: Scalars['Int']['input'];
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


export type MutationLeaveTripArgs = {
  id: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  payload: LoginPayloadIt;
};


export type MutationResendOtpArgs = {
  payload: OtpLoginPayloadIt;
};


export type MutationSendMessageArgs = {
  chatId: Scalars['Int']['input'];
  message: Scalars['String']['input'];
};


export type MutationSendOtpArgs = {
  payload: OtpLoginPayloadIt;
};


export type MutationSignupArgs = {
  payload: SignupAppUsersIt;
};


export type MutationStartTripArgs = {
  id: Scalars['Float']['input'];
};


export type MutationVerifyOtpArgs = {
  payload: OtpVerificationPayloadIt;
};

export type NearbyTrips = {
  currentLocation: GeoPointIt;
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
  chat: TripChatOt;
  chatByTripId?: Maybe<TripChatOt>;
  me: AppUsersOt;
  myTrips: GetTripsOt;
  trip: TripsEntity;
  trips: GetTripsOt;
  users: Array<AppUsersOt>;
};


export type QueryChatArgs = {
  id: Scalars['Int']['input'];
};


export type QueryChatByTripIdArgs = {
  tripId: Scalars['Int']['input'];
};


export type QueryMyTripsArgs = {
  filters?: InputMaybe<GetTripsFiltersIt>;
  meta?: InputMaybe<TripsMetaRequest>;
};


export type QueryTripArgs = {
  id: Scalars['Float']['input'];
};


export type QueryTripsArgs = {
  filters?: InputMaybe<GetTripsFiltersIt>;
  meta?: InputMaybe<TripsMetaRequest>;
};

export type ScreenGpsBoundariesIt = {
  bottomLeft: GeoPointIt;
  bottomRight: GeoPointIt;
  topLeft: GeoPointIt;
  topRight: GeoPointIt;
};

export type SignupAppUsersIt = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageReceivedOnAChat: TripChatMessageOverSubscriptionOt;
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

export type TripChatMessageOt = {
  __typename?: 'TripChatMessageOt';
  createdAt: Scalars['String']['output'];
  message: Scalars['String']['output'];
  user: AppUsersEntity;
};

export type TripChatMessageOverSubscriptionOt = {
  __typename?: 'TripChatMessageOverSubscriptionOt';
  chatId: Scalars['Float']['output'];
  createdAt: Scalars['String']['output'];
  fromUser: AppUsersEntity;
  message: Scalars['String']['output'];
  tripId: Scalars['Float']['output'];
};

export type TripChatOt = {
  __typename?: 'TripChatOt';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  messages?: Maybe<Array<TripChatMessageOt>>;
  trip?: Maybe<TripsEntity>;
  tripId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type TripOt = {
  __typename?: 'TripOt';
  capacity?: Maybe<Scalars['Float']['output']>;
  category: Scalars['String']['output'];
  checkpoints?: Maybe<Array<TripsCheckpoints>>;
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['Float']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  driver?: Maybe<AppUsersEntity>;
  driverId?: Maybe<Scalars['Float']['output']>;
  dropoffAddress: TripAddressOt;
  dropoffLatitude: Scalars['Float']['output'];
  dropoffLongitude: Scalars['Float']['output'];
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  occupiedSeats?: Maybe<Scalars['Float']['output']>;
  passengers?: Maybe<Array<AppUsersEntity>>;
  pickupAddress: TripAddressOt;
  pickupLatitude: Scalars['Float']['output'];
  pickupLongitude: Scalars['Float']['output'];
  plannedAt: Scalars['DateTime']['output'];
  reservations?: Maybe<Array<TripReservationOt>>;
  riders?: Maybe<Array<AppUsersEntity>>;
  seatsStatus: Scalars['String']['output'];
  startedAt?: Maybe<Scalars['DateTime']['output']>;
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

export type TripsCheckpoints = {
  __typename?: 'TripsCheckpoints';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  status: Scalars['String']['output'];
  trip?: Maybe<TripsEntity>;
  tripId?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type TripsEntity = {
  __typename?: 'TripsEntity';
  capacity?: Maybe<Scalars['Float']['output']>;
  category: Scalars['String']['output'];
  checkpoints?: Maybe<Array<TripsCheckpoints>>;
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['Float']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  driver?: Maybe<AppUsersEntity>;
  driverId?: Maybe<Scalars['Float']['output']>;
  dropoffAddress: TripAddressOt;
  dropoffLatitude: Scalars['Float']['output'];
  dropoffLongitude: Scalars['Float']['output'];
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  occupiedSeats?: Maybe<Scalars['Float']['output']>;
  passengers?: Maybe<Array<AppUsersEntity>>;
  pickupAddress: TripAddressOt;
  pickupLatitude: Scalars['Float']['output'];
  pickupLongitude: Scalars['Float']['output'];
  plannedAt: Scalars['DateTime']['output'];
  reservations?: Maybe<Array<TripReservationOt>>;
  riders?: Maybe<Array<AppUsersEntity>>;
  seatsStatus: Scalars['String']['output'];
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  timeline?: Maybe<Array<TripsTimelineEntity>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type TripsMetaRequest = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  nearby?: InputMaybe<NearbyTrips>;
  order?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type TripsTimelineEntity = {
  __typename?: 'TripsTimelineEntity';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  occupiedSeats?: Maybe<Scalars['Float']['output']>;
  status: Scalars['String']['output'];
  trip?: Maybe<TripsEntity>;
  tripId?: Maybe<Scalars['Float']['output']>;
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

export type SendOtpMutationMutationVariables = Exact<{
  sendOTPPayload: OtpLoginPayloadIt;
}>;


export type SendOtpMutationMutation = { __typename?: 'Mutation', sendOtp: { __typename?: 'MessageResponseOt', message: string } };

export type VeryOtpMutationMutationVariables = Exact<{
  verifyOTPPayload: OtpVerificationPayloadIt;
}>;


export type VeryOtpMutationMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'LoginResponseOt', accessToken: string, refreshToken: string } };

export type CreateTripMutationMutationVariables = Exact<{
  createTripPayload: CreateTripIt;
}>;


export type CreateTripMutationMutation = { __typename?: 'Mutation', createTrip: { __typename?: 'TripsEntity', id: number } };

export type JoinTripMutationMutationVariables = Exact<{
  joinTripId: Scalars['Float']['input'];
  joinTripPayload: JoinTripIt;
}>;


export type JoinTripMutationMutation = { __typename?: 'Mutation', joinTrip: { __typename?: 'TripsEntity', id: number } };

export type MapTripsQueryQueryVariables = Exact<{
  tripsQueryFilters?: InputMaybe<GetTripsFiltersIt>;
  tripsQueryMeta?: InputMaybe<TripsMetaRequest>;
}>;


export type MapTripsQueryQuery = { __typename?: 'Query', trips: { __typename?: 'GetTripsOt', items: Array<{ __typename?: 'TripOt', id: number, capacity?: number | null, occupiedSeats?: number | null, plannedAt: any, pickupLatitude: number, pickupLongitude: number, dropoffLatitude: number, dropoffLongitude: number, pickupAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null }, dropoffAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null } }>, meta: { __typename?: 'MetaResponse', limit?: number | null, page?: number | null, totalCount?: number | null, totalPages?: number | null } } };

export type SingleTripQueryQueryVariables = Exact<{
  singleTripId: Scalars['Float']['input'];
}>;


export type SingleTripQueryQuery = { __typename?: 'Query', trip: { __typename?: 'TripsEntity', id: number, capacity?: number | null, occupiedSeats?: number | null, plannedAt: any, driverId?: number | null, pickupLatitude: number, pickupLongitude: number, dropoffLatitude: number, dropoffLongitude: number, passengers?: Array<{ __typename?: 'AppUsersEntity', id: number }> | null, pickupAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null }, dropoffAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null } } };

export type TripsQueryQueryVariables = Exact<{
  tripsQueryFilters?: InputMaybe<GetTripsFiltersIt>;
  tripsQueryMeta?: InputMaybe<TripsMetaRequest>;
}>;


export type TripsQueryQuery = { __typename?: 'Query', trips: { __typename?: 'GetTripsOt', items: Array<{ __typename?: 'TripOt', id: number, capacity?: number | null, occupiedSeats?: number | null, plannedAt: any, passengers?: Array<{ __typename?: 'AppUsersEntity', id: number }> | null, pickupAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null }, dropoffAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null } }>, meta: { __typename?: 'MetaResponse', limit?: number | null, page?: number | null, totalCount?: number | null, totalPages?: number | null } } };

export type LoginMutationMutationVariables = Exact<{
  loginPayload: LoginPayloadIt;
}>;


export type LoginMutationMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponseOt', accessToken: string, refreshToken: string } };

export type SignUpMutationMutationVariables = Exact<{
  signUpPayload: SignupAppUsersIt;
}>;


export type SignUpMutationMutation = { __typename?: 'Mutation', signup: { __typename?: 'AppUsersOt', id: number } };

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'Query', me: { __typename?: 'AppUsersOt', id: number, email: string, name: string, phone: string, role: string, status: string } };

export type TripCardFragment = { __typename?: 'TripOt', capacity?: number | null, occupiedSeats?: number | null, plannedAt: any, pickupAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null }, dropoffAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null } } & { ' $fragmentName'?: 'TripCardFragment' };

export type TripRouteFragment = { __typename?: 'TripOt', pickupLatitude: number, pickupLongitude: number, dropoffLatitude: number, dropoffLongitude: number } & { ' $fragmentName'?: 'TripRouteFragment' };

export type UseIsUserPartOfTheTripFragment = { __typename?: 'TripOt', driverId?: number | null, passengers?: Array<{ __typename?: 'AppUsersEntity', id: number }> | null } & { ' $fragmentName'?: 'UseIsUserPartOfTheTripFragment' };

export type GetNewTokensMutationVariables = Exact<{ [key: string]: never; }>;


export type GetNewTokensMutation = { __typename?: 'Mutation', getNewTokens: { __typename?: 'LoginResponseOt', accessToken: string, refreshToken: string } };

export type MessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageSubscription = { __typename?: 'Subscription', messageReceivedOnAChat: { __typename?: 'TripChatMessageOverSubscriptionOt', chatId: number, tripId: number, message: string, createdAt: string, fromUser: { __typename?: 'AppUsersEntity', id: number, name: string } } };

export const TripCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TripOt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"plannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"pickupAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dropoffAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}}]}}]}}]} as unknown as DocumentNode<TripCardFragment, unknown>;
export const TripRouteFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripRoute"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TripOt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pickupLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"pickupLongitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLongitude"}}]}}]} as unknown as DocumentNode<TripRouteFragment, unknown>;
export const UseIsUserPartOfTheTripFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UseIsUserPartOfTheTrip"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TripOt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"passengers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UseIsUserPartOfTheTripFragment, unknown>;
export const SendOtpMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendOTPMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendOTPPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpLoginPayloadIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendOTPPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SendOtpMutationMutation, SendOtpMutationMutationVariables>;
export const VeryOtpMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VeryOTPMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verifyOTPPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpVerificationPayloadIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verifyOTPPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<VeryOtpMutationMutation, VeryOtpMutationMutationVariables>;
export const CreateTripMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTripMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createTripPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTripIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTrip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createTripPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTripMutationMutation, CreateTripMutationMutationVariables>;
export const JoinTripMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinTripMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"joinTripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"joinTripPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JoinTripIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinTrip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"joinTripId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"joinTripPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<JoinTripMutationMutation, JoinTripMutationMutationVariables>;
export const MapTripsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MapTripsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryFilters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetTripsFiltersIt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryMeta"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TripsMetaRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryFilters"}}},{"kind":"Argument","name":{"kind":"Name","value":"meta"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryMeta"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"plannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"pickupAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pickupLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"pickupLongitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLongitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<MapTripsQueryQuery, MapTripsQueryQueryVariables>;
export const SingleTripQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SingleTripQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"singleTripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"singleTripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"plannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"passengers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pickupAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pickupLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"pickupLongitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLongitude"}}]}}]}}]} as unknown as DocumentNode<SingleTripQueryQuery, SingleTripQueryQueryVariables>;
export const TripsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TripsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryFilters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetTripsFiltersIt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryMeta"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TripsMetaRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryFilters"}}},{"kind":"Argument","name":{"kind":"Name","value":"meta"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryMeta"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"plannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passengers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pickupAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dropoffAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<TripsQueryQuery, TripsQueryQueryVariables>;
export const LoginMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginPayloadIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutationMutation, LoginMutationMutationVariables>;
export const SignUpMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUpMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signUpPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupAppUsersIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signUpPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SignUpMutationMutation, SignUpMutationMutationVariables>;
export const MeQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<MeQueryQuery, MeQueryQueryVariables>;
export const GetNewTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetNewTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNewTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<GetNewTokensMutation, GetNewTokensMutationVariables>;
export const MessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"Message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageReceivedOnAChat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"tripId"}},{"kind":"Field","name":{"kind":"Name","value":"fromUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<MessageSubscription, MessageSubscriptionVariables>;