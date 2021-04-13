export function loadBaseConfig() {
  return {
    namespace: 'base',
    values: {
      host: process.env.REACT_APP_HOST,
      apiUri: process.env.REACT_APP_API_URI,
      env: process.env.NODE_ENV || 'development',
    },
  };
}
