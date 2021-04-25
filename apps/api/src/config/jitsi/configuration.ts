import { registerAs } from '@nestjs/config';

export default registerAs('jitsi', () => ({
  host: process.env.HU_JITSI_HOST,
}));
