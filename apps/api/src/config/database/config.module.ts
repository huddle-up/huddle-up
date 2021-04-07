import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { DatabaseConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        HU_DB_USERNAME: Joi.string().required(),
        HU_DB_PASSWORD: Joi.string().required(),
        HU_DB_DATABASE: Joi.string().required(),
        HU_DB_HOST: Joi.string().required(),
        HU_DB_PORT: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
      },
    }),
  ],
  providers: [ConfigService, DatabaseConfigService],
  exports: [ConfigService, DatabaseConfigService],
})
export class DatabaseConfigModule {}
