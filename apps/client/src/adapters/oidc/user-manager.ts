import { UserManager } from 'oidc-client';
import { Config } from '../../config';

function parseOptions(config: Config) {
  return {
    client_id: config.get<string>('oidc.clientId'),
    client_secret: config.get<string>('oidc.clientSecret'),
    authority: `https://${config.get<string>('oidc.issuer')}`,
    redirect_uri: config.get<string>('oidc.redirectUri'),
    scope: config.get<string>('oidc.scope'),
    response_type: 'code',
  };
}

export function createUserManager(config: Config) {
  const options = parseOptions(config);
  return new UserManager(options);
}
