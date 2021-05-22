import { createConfig } from './config';
import { loadBaseConfig } from './base.config';
import { loadi18nConfig } from './i18n.config';
import { loadGraphQLConfig } from './graphql.config';
import { loadOidcConfig } from './oidc.config';
import { loadAuthConfig } from './auth.config';
import { loadRulesConfig } from './rules.config';

const defaultConfig = createConfig([
  loadBaseConfig,
  loadi18nConfig,
  loadGraphQLConfig,
  loadAuthConfig,
  loadOidcConfig,
  loadRulesConfig,
]);

export { createConfig, Config } from './config';

export default defaultConfig;
