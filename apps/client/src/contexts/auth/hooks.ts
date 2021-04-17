import { useContext } from 'react';
import { AuthContext } from './auth.provider';

export function useAuth() {
  return useContext(AuthContext);
}
