import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Config } from '../../config';

export function createApolloClient(config: Config) {
  const client = new ApolloClient({
    uri: config.get<string>('graphql.uri'),
    cache: new InMemoryCache(),
  });
  return client;
}
