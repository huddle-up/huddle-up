import React, { useCallback, useState } from 'react';
import { createUserManager } from '../../adapters/oidc';
import { useAuth } from '../auth';
import { useConfig } from '../config';

export const OidcContext = React.createContext(null);

function useOidcProviderState() {
  const config = useConfig();
  const authService = useAuth();
  const [userManager] = useState(createUserManager(config));

  const signInRedirect = useCallback(() => {
    userManager.signinRedirect();
  }, [userManager]);

  const signInCallback = useCallback(async () => {
    try {
      const user = await userManager.signinRedirectCallback();
      authService.login(user.id_token);
      return true;
    } catch (e) {
      return false;
    }
  }, [userManager, authService]);

  return {
    signInCallback,
    signInRedirect,
    providerInfo: {
      name: config.get<string>('oidc.providerName'),
      icon: config.get<string>('oidc.providerIcon'),
    },
  };
}

function OidcProvider({ children }: { children: React.ReactNode }) {
  const oidcState = useOidcProviderState();
  return <OidcContext.Provider value={oidcState}>{children}</OidcContext.Provider>;
}

export default OidcProvider;
