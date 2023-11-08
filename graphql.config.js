const { join } = require('path');

const api = process.env.GRAPHQL_CODEGEN_API ?? 'http://45.32.105.38/graphql';

const mobileAppSrcURI = join('apps', 'mobile-app', 'src');

/** @type {import('graphql-config').IGraphQLConfig } */
module.exports = {
  projects: {
    'mobile-app': {
      schema: api,
      documents: join(mobileAppSrcURI, '**', '*.{tsx,ts}'),
      extensions: {
        codegen: {
          overrides: true,
          generates: {
            [join(mobileAppSrcURI, 'gql', '/')]: {
              preset: 'client',
              plugins: [],
            },
            [join(__dirname, 'graphql.schema.json')]: {
              plugins: ['introspection'],
            },
          },
          hooks: {
            afterAllFileWrite: ['eslint --fix'],
          },
        },
      },
    },
  },
};
