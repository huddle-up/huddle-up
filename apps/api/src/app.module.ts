import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve, join } from 'path';
import { AppConfigModule } from './config/app/config.module';
import { DatabaseConfigModule } from './config/database/config.module';
import { DatabaseConfigService } from './config/database/config.service';
import { GraphqlConfigModule } from './config/graphql/config.module';
import { GraphqlConfigService } from './config/graphql/config.service';
import { MeetingsModule } from './meetings/meetings.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConferencesModule } from './conferences/conferences.module';
import { TagsModule } from './tags/tags.module';
import { ParticipationsModule } from './participations/participations.module';

@Module({
  imports: [
    AppConfigModule,
    GraphQLModule.forRootAsync({
      imports: [GraphqlConfigModule],
      inject: [GraphqlConfigService],
      useFactory: async (gqlConfigService: GraphqlConfigService) => ({
        playground: gqlConfigService.playground,
        debug: true,
        installSubscriptionHandlers: true,
        autoSchemaFile: resolve(__dirname, '..', 'src', 'schema.gql'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: async (dbConfigService: DatabaseConfigService) => ({
        type: 'postgres',
        username: dbConfigService.username,
        password: dbConfigService.password,
        database: dbConfigService.database,
        host: dbConfigService.host,
        port: dbConfigService.port,
        entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
        synchronize: dbConfigService.synchronize,
      }),
    }),
    AuthModule,
    UsersModule,
    MeetingsModule,
    ConferencesModule.register(),
    TagsModule,
    ParticipationsModule,
  ],
})
export class AppModule {}
