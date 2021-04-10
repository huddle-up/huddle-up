import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { AuthConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        HU_AUTH_SECRET: Joi.string().required(),
        HU_AUTH_OIDC_ISSUER_DOMAIN: Joi.string().required(),
        HU_AUTH_OIDC_AUDIENCE: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
      },
    }),
  ],
  providers: [ConfigService, AuthConfigService],
  exports: [ConfigService, AuthConfigService],
})
export class AuthConfigModule {}
