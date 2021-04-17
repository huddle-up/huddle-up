import { useCallback, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Config } from '../../config';
import { authenticate } from './api';
import { AuthService } from './auth-service.interface';
import { AuthStorage } from './auth-storage';
import { IdToken } from './id-token.interface';

function parseToken(token?: string) {
  if (!token) {
    return null;
  }
  const user = jwtDecode(token) as IdToken;
  if (!user) {
    console.log(user);
    return null;
  }
  // We'll have to check if the token is still valid.
  // The iss date is in seconds since epoch, so it has to be multiplied by 1000 to be comparable with the current Date from the Date API
  if (user.exp * 1000 < Date.now()) {
    console.log('eeeee?', user.exp * 1000, Date.now());
    return null;
  }
  return { user, token };
}

export function useAuthService(config: Config): AuthService {
  const apiUri = config.get('base.apiUri');
  const [storage] = useState(new AuthStorage(config.get('auth.storage'), config.get('auth.storagePrefix')));
  const [userData, setUserData] = useState(parseToken(storage.get('idToken')));

  const login = useCallback(
    async (oidcToken: string) => {
      const { idToken } = await authenticate(`${apiUri}/auth/login`, oidcToken);
      storage.set('idToken', idToken);
      setUserData(parseToken(idToken));
    },
    [apiUri, storage]
  );

  const logout = useCallback(() => {
    storage.delete('idToken');
    setUserData(null);
  }, [storage]);

  const { token, user } = userData || {};

  return {
    user,
    token,
    login,
    logout,
    loggedIn: !!token,
  };
}
