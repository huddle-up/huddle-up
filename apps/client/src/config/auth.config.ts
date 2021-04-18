import { Config } from './config';

export function loadAuthConfig(config: Config) {
  return {
    namespace: 'auth',
    values: {
      storage: localStorage,
      storagePrefix: 'hu-auth',
    },
  };
}
