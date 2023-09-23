import type { CodegenConfig } from '@graphql-codegen/cli';
import { join } from 'path';

const api = process.env.GRAPHQL_CODEGEN_API ?? 'http://localhost:3000/graphql';

const config: CodegenConfig = {
  overwrite: true,
  schema: api,
  documents: join(__dirname, 'src', '**', '*.tsx'),
  generates: {
    [join(__dirname, 'src', 'gql', '/')]: {
      preset: 'client',
      plugins: [],
    },
    [join(__dirname, 'graphql.schema.json')]: {
      plugins: ['introspection'],
    },
  },
};

export default config;
