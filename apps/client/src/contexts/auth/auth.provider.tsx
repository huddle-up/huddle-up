import React from 'react';
import { useAuthService, AuthService } from '../../adapters/auth';
import { useConfig } from '../config';

export const AuthContext = React.createContext<AuthService>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const config = useConfig();
  const authService = useAuthService(config);
  return <AuthContext.Provider value={authService}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
