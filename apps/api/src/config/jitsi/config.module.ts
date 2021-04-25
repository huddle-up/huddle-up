import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JitsiConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        HU_JITSI_HOST: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
      },
    }),
  ],
  providers: [ConfigService, JitsiConfigService],
  exports: [ConfigService, JitsiConfigService],
})
export class JitsiConfigModule {}
