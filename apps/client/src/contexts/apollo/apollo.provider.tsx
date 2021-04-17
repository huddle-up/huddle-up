import React from 'react';
import { ApolloProvider as ApolloClientProvider } from '@apollo/client/react';
import { createApolloClient } from '../../adapters/graphql';
import { useConfig } from '../config';
import { useAuth } from '../auth';

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  const config = useConfig();
  const auth = useAuth();
  const client = createApolloClient(config, () => auth.token);
  return <ApolloClientProvider client={client}>{children}</ApolloClientProvider>;
}
