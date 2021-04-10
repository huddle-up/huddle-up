import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { DatabaseConfigModule } from './config/database/config.module';
import { DatabaseConfigService } from './config/database/config.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
