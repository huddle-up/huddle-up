import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FileLogger } from 'common/logging/file-logger';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new FileLogger('HuddleUp'), cors: true });
  app.use(helmet({ contentSecurityPolicy: false }));
  app.useGlobalPipes(new ValidationPipe());
  const appConfig: AppConfigService = app.get('AppConfigService');

  await app.listen(appConfig.port);
}
bootstrap();
