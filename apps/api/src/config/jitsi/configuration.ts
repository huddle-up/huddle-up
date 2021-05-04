import { registerAs } from '@nestjs/config';

export default registerAs('jitsi', () => ({
  host: process.env.HU_JITSI_HOST,
  jwt: {
    enabled: process.env.HU_JITSI_JWT_ENABLED || false,
    appId: process.env.HU_JITSI_JWT_APP_ID || '',
    secret: process.env.HU_JITSI_JWT_SECRET || '',
  },
}));
