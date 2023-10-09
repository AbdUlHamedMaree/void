import { graphql } from '$gql';
import { storage } from '$libs/mmkv';
import { graphqlRequest } from './graphql';

const getNewTokensDocument = graphql(`
  mutation GetNewTokens {
    getNewTokens {
      accessToken
      refreshToken
    }
  }
`);

export const getNewTokensRequest = () => {
  const refreshToken = storage.refreshToken.get();

  return graphqlRequest(getNewTokensDocument, undefined, {
    headers: { Authorization: `Bearer ${refreshToken}` },
    __refreshTokenRequest: true,
  });
};
