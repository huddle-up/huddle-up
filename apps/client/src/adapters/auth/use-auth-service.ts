import { useCallback, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Config } from '../../config';
import { authenticate } from './api';
import { AuthService } from './auth-service.interface';
import { AuthStorage } from './auth-storage';

export function useAuthService(config: Config): AuthService {
  const apiUri = config.get('base.apiUri');
  const [storage] = useState(new AuthStorage(config.get('auth.storage'), config.get('auth.storagePrefix')));
  const [token, setToken] = useState(storage.get('idToken'));
  const [user, setUser] = useState(token ? jwtDecode(token) : null);
  const [loggedIn, setLoggedIn] = useState(!!token);

  const login = useCallback(
    async (oidcToken: string) => {
      const { idToken } = await authenticate(`${apiUri}/auth/login`, oidcToken);
      storage.set('idToken', idToken);
      setToken(idToken);
    },
    [apiUri, storage]
  );

  const logout = useCallback(() => {
    storage.delete('idToken');
    setToken(null);
  }, [storage]);

  useEffect(() => {
    setUser(token ? jwtDecode(token) : null);
    setLoggedIn(!!token);
  }, [token]);

  return {
    user,
    token,
    login,
    logout,
    loggedIn,
  };
}
