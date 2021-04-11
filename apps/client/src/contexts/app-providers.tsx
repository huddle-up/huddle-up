import React from 'react';
import { ConfigProvider } from './config';
import { ApolloProvider } from './apollo';
import { ThemeProvider } from './theme';
import { I18nProvider } from './i18n';
import { LocalesProvider } from './locales';

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <ApolloProvider>
        <I18nProvider>
          <LocalesProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </LocalesProvider>
        </I18nProvider>
      </ApolloProvider>
    </ConfigProvider>
  );
}

export default AppProviders;
