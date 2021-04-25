import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JitsiConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('jitsi.host');
  }
}
