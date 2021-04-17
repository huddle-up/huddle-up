import { useContext } from 'react';
import { OidcContext } from './oidc.provider';

export function useOidc() {
  return useContext(OidcContext);
}
