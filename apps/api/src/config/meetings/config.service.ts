import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MeetingsConfigService {
  constructor(private configService: ConfigService) {}

  get preparationTime(): number {
    return this.configService.get<number>('meetings.preparationTime');
  }
}
