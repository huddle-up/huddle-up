import { Config } from './config';

function extractAvailableLocales(fromEnv): string[] {
  if (fromEnv) {
    return fromEnv.split(',');
  }
  return ['en'];
}

export function loadi18nConfig(config: Config) {
  return {
    namespace: 'i18n',
    values: {
      defaultLocale: process.env.REACT_APP_I18N_DEFAULT_LOCALE || 'en',
      availableLocales: extractAvailableLocales(process.env.REACT_APP_I18N_AVAILABLE_LOCALES),
      debug: config.get<string>('base.env') === 'development',
    },
  };
}
