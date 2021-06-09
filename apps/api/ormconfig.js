const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const envPath = path.resolve(__dirname, '../../config/api/.env');
const env = dotenv.parse(fs.readFileSync(envPath));
module.exports = {
  type: 'postgres',
  username: env.HU_DB_USERNAME,
  password: env.HU_DB_PASSWORD,
  database: env.HU_DB_DATABASE,
  host: env.HU_DB_HOST,
  port: env.HU_DB_PORT,
  entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};
