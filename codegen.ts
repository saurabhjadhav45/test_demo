import type { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'

const graphqlUrl = process.env.NUXT_PUBLIC_GRAPHQL_URL || 'https://api-hk-dev.mazecare.com/graphql'

const config: CodegenConfig = {
  schema: {
    [graphqlUrl]: {
      loader: './mazecare-gql-loader.js',
    },
  },
  documents: ['src/gql/**/*.graphql'],
  ignoreNoDocuments: true,
  config: {
    useTypeImports: true,
  },
  generates: {
    './src/gql/schema/schema.ts': {
      plugins: ['typescript'],
    },
    './src/gql/schema/index.ts': {
      preset: 'import-types',
      plugins: ['typescript-operations', 'typed-document-node'],
      presetConfig: {
        typesPath: './schema',
      },
    },
  },
}

export default config
