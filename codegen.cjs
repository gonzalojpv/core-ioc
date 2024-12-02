require('dotenv').config()

module.exports = {
  overwrite: true,
  schema: [
    {
      'https://gql-jobs-external.dev.xoeye.com/graphql': {
        headers: {
          Authorization: process.env.GRAPHQL_API_TOKEN,
        },
      },
    },
    {
      'https://gql-share-external.dev.xoeye.com/graphql': {
        headers: {
          Authorization: process.env.GRAPHQL_API_TOKEN,
        },
      },
    },
  ],
  documents: 'src/**/*.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
    },
  },
}
