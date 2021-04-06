import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  username: process.env.HU_DB_USERNAME,
  password: process.env.HU_DB_PASSWORD,
  database: process.env.HU_DB_DATABASE,
  host: process.env.HU_DB_HOST,
  port: process.env.HU_DB_PORT,
}));
