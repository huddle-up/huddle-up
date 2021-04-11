import { Config } from './config';

export function loadGraphQLConfig(config: Config) {
  const graphQlUri = process.env.REACT_APP_GRAPHQL_URI || `${config.get('base.apiUri')}/graphql`;
  return {
    namespace: 'graphql',
    values: {
      uri: graphQlUri,
    },
  };
}
