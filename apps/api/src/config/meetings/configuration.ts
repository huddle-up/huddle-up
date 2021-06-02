import { registerAs } from '@nestjs/config';

export default registerAs('meetings', () => ({
  preparationTime: process.env.HU_MEETINGS_PREPARATION_TIME || 10,
}));
