import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Locales } from './locales/locales.interface';
import * as allLocales from './locales';
import { useConfig } from '../config';

function useDetectedLocale(): Locales {
  const { i18n } = useTranslation();
  const config = useConfig();
  const [defaultLocale] = useState(config.get<string>('i18n.defaultLocale'));

  const locale = useMemo<Locales>(() => {
    const currentLanguage = i18n.language.split('-');
    if (currentLanguage[0] && allLocales[currentLanguage[0]]) {
      return allLocales[currentLanguage[0]];
    }
    return allLocales[defaultLocale];
  }, [defaultLocale, i18n.language]);

  return locale;
}

export const LocalesContext = React.createContext<Locales>(null);

export function LocalesProvider({ children }: { children: React.ReactNode }) {
  const locale = useDetectedLocale();
  return <LocalesContext.Provider value={locale}>{children}</LocalesContext.Provider>;
}
