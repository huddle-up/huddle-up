import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache } from '@apollo/client';
import { Config } from '../../config';

export function createApolloClient(config: Config, getBearerToken: () => string) {
  const httpLink = new HttpLink({ uri: config.get<string>('graphql.uri') });
  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = getBearerToken();
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });

    return forward(operation);
  });
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });
  return client;
}
