import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MeetingsConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        HU_MEETINGS_PREPARATION_TIME: Joi.number(),
      }),
      validationOptions: {
        allowUnknown: true,
      },
    }),
  ],
  providers: [ConfigService, MeetingsConfigService],
  exports: [ConfigService, MeetingsConfigService],
})
export class MeetingsConfigModule {}
