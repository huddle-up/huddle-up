import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve, join } from 'path';
import * as fs from 'fs';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get username(): string {
    return this.configService.get<string>('database.username');
  }

  get password(): string {
    return this.configService.get<string>('database.password');
  }

  get database(): string {
    return this.configService.get<string>('database.database');
  }

  get host(): string {
    return this.configService.get<string>('database.host');
  }

  get port(): number {
    return Number(this.configService.get<number>('database.port'));
  }

  get synchronize(): boolean {
    return Boolean(this.configService.get<boolean>('database.synchronize'));
  }
}
