import React from 'react';
import { ApolloProvider as ApolloClientProvider } from '@apollo/client/react';
import { createApolloClient } from '../../adapters/graphql';
import { useConfig } from '../config';

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  const config = useConfig();
  const client = createApolloClient(config);
  return <ApolloClientProvider client={client}>{children}</ApolloClientProvider>;
}
