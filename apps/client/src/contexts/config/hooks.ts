import { useContext } from 'react';
import { ConfigContext } from './config.provider';

export function useConfig() {
  return useContext(ConfigContext);
}
