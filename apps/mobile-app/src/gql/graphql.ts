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
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  documents?: Maybe<Array<UserDocumentsEntity>>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  vehicle?: Maybe<VehiclesEntity>;
};

export type CreateAppUsersIt = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type LoginPayloadIt = {
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type LoginResponseOt = {
  __typename?: 'LoginResponseOt';
  accessToken?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  user: AppUsersOt;
};

export type MessageResponseOt = {
  __typename?: 'MessageResponseOt';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: AppUsersOt;
  getNewTokens: LoginResponseOt;
  login: LoginResponseOt;
  resendOtp: MessageResponseOt;
  sendOtp: MessageResponseOt;
  signup: AppUsersOt;
  verifyOtp: LoginResponseOt;
};


export type MutationCreateUserArgs = {
  payload: CreateAppUsersIt;
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
  users: Array<AppUsersOt>;
};

export type SignupAppUsersIt = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role: Scalars['String']['input'];
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

export type TripsEntity = {
  __typename?: 'TripsEntity';
  capacity?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  driver?: Maybe<AppUsersEntity>;
  driverId?: Maybe<Scalars['String']['output']>;
  dropoffAddress: TripAddressOt;
  dropoffLatitude: Scalars['Float']['output'];
  dropoffLongitude: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  occupiedSeats?: Maybe<Scalars['Float']['output']>;
  passengers?: Maybe<Array<AppUsersEntity>>;
  pickupAddress: TripAddressOt;
  pickupLatitude: Scalars['Float']['output'];
  pickupLongitude: Scalars['Float']['output'];
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

export type LoginMutationMutationVariables = Exact<{
  loginPayload: LoginPayloadIt;
}>;


export type LoginMutationMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponseOt', accessToken?: string | null, refreshToken?: string | null, user: { __typename?: 'AppUsersOt', id?: number | null, email?: string | null, phone?: string | null, role?: string | null, status?: string | null, createdAt?: any | null, updatedAt?: any | null } } };

export type VeryOtpMutationMutationVariables = Exact<{
  verifyOTPPayload: OtpVerificationPayloadIt;
}>;


export type VeryOtpMutationMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'LoginResponseOt', accessToken?: string | null, refreshToken?: string | null, user: { __typename?: 'AppUsersOt', id?: number | null, email?: string | null, phone?: string | null } } };

export type SignUpMutationMutationVariables = Exact<{
  signUpPayload: SignupAppUsersIt;
}>;


export type SignUpMutationMutation = { __typename?: 'Mutation', signup: { __typename?: 'AppUsersOt', id?: number | null } };

export type SendOtpMutationMutationVariables = Exact<{
  sendOTPPayload: OtpLoginPayloadIt;
}>;


export type SendOtpMutationMutation = { __typename?: 'Mutation', sendOtp: { __typename?: 'MessageResponseOt', message: string } };


export const LoginMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginPayloadIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutationMutation, LoginMutationMutationVariables>;
export const VeryOtpMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VeryOTPMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verifyOTPPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpVerificationPayloadIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verifyOTPPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]}}]} as unknown as DocumentNode<VeryOtpMutationMutation, VeryOtpMutationMutationVariables>;
export const SignUpMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUpMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signUpPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupAppUsersIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signUpPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SignUpMutationMutation, SignUpMutationMutationVariables>;
export const SendOtpMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendOTPMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendOTPPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpLoginPayloadIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendOTPPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SendOtpMutationMutation, SendOtpMutationMutationVariables>;