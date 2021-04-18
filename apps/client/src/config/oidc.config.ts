export function loadOidcConfig() {
  return {
    namespace: 'oidc',
    values: {
      clientId: process.env.REACT_APP_OIDC_CLIENT_ID,
      clientSecret: process.env.REACT_APP_OIDC_CLIENT_SECRET,
      issuer: process.env.REACT_APP_OIDC_ISSUER,
      redirectUri: process.env.REACT_APP_OIDC_REDIRECT_URI,
      scope: process.env.REACT_APP_OIDC_SCOPE || 'openid email profile',
    },
  };
}
