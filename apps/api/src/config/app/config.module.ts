import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { AppConfigService } from './config.service';
import { getEnvPath } from '../utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvPath('.env'),
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
