import { createGraphQLCRUDEntity } from '$libs/graphql-react-query/create-graphql-crud-entity';
import { loginDocument } from './mutations/login';
import { signUpDocument } from './mutations/sign-up';

export const {
  queries: _,
  mutations: [useLoginMutation, useSignUpMutation],
} = createGraphQLCRUDEntity()(loginDocument, signUpDocument);
