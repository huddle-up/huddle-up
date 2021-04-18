import { createConfig } from './config';
import { loadBaseConfig } from './base.config';
import { loadi18nConfig } from './i18n.config';
import { loadGraphQLConfig } from './graphql.config';
import { loadOidcConfig } from './oidc.config';
import { loadAuthConfig } from './auth.config';

const defaultConfig = createConfig([loadBaseConfig, loadi18nConfig, loadGraphQLConfig, loadAuthConfig, loadOidcConfig]);

export { createConfig, Config } from './config';

export default defaultConfig;
