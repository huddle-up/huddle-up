import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { DatabaseConfigModule } from './config/database/config.module';
import { DatabaseConfigService } from './config/database/config.service';
import { GraphqlConfigModule } from './config/graphql/config.module';
import { GraphqlConfigService } from './config/graphql/config.service';
import { MeetingsModule } from './meetings/meetings.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

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
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
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
        // TODO: Check if this can cause problems if certain modules are not needed
        entities: ['dist/**/*.entity{.ts,.js}'],
        // TODO: Use migrations for production
        synchronize: true,
      }),
    }),
    MeetingsModule,
    AuthModule,
    UsersModule,
  ],
  providers: [AppService],
})
export class AppModule {}
