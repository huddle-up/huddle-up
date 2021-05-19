import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolve, join } from 'path';
import configuration from './configuration';
import { AppConfigService } from './config.service';

function envPaths() {
  const configDirectory = resolve(__dirname, '../../../../../config/api');
  return [join(configDirectory, '.env')];
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envPaths(),
      load: [configuration],
      validationSchema: Joi.object({
        HU_PORT: Joi.number().default(4000),
      }),
      validationOptions: {
        allowUnknown: true,
      },
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
