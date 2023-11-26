import { API_GRAPHQL_PATHNAME, API_HOST, API_WS_PROTOCOL } from '@env';
import { createClient } from 'graphql-ws';

export const graphqlWsClient = createClient({
  url: API_WS_PROTOCOL + '//' + API_HOST + API_GRAPHQL_PATHNAME,
});
