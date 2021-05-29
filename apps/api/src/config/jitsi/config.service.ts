import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface JitsiJwtConfig {
  enabled: boolean;
  appId: string;
  secret: string;
}

@Injectable()
export class JitsiConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('jitsi.host');
  }

  get jwt(): JitsiJwtConfig {
    return this.configService.get<JitsiJwtConfig>('jitsi.jwt');
  }
}
