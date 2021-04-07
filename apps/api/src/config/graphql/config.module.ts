import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { GraphqlConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        HU_GRAPHQL_PLAYGROUND_ACTIVE: Joi.boolean().default(true),
      }),
      validationOptions: {
        allowUnknown: true,
      },
    }),
  ],
  providers: [ConfigService, GraphqlConfigService],
  exports: [ConfigService, GraphqlConfigService],
})
export class GraphqlConfigModule {}
