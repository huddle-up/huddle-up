import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import config from '../../config';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: config.get<string>('i18n.defaultLocale'),
    supportedLngs: config.get<string[]>('i18n.availableLocales'),
    debug: config.get<boolean>('i18n.debug'),

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
