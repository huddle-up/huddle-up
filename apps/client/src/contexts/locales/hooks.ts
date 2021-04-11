import { useContext } from 'react';
import { LocalesContext } from './locales.provider';

export function useLocales() {
  return useContext(LocalesContext);
}
