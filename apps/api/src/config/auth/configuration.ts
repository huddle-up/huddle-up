import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.HU_AUTH_SECRET,
  oidcIssuerDomain: process.env.HU_AUTH_OIDC_ISSUER_DOMAIN,
  oidcIssuer: `https://${process.env.HU_AUTH_OIDC_ISSUER_DOMAIN}/`,
  oidcAudience: process.env.HU_AUTH_OIDC_AUDIENCE,
}));
