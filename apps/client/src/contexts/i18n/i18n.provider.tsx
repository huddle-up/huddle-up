import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '../../adapters/i18n';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
