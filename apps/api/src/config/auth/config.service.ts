import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService) {}

  get secret(): string {
    return this.configService.get<string>('auth.secret');
  }

  get oidcIssuer(): string {
    return this.configService.get<string>('auth.oidcIssuer');
  }

  get oidcIssuerDomain(): string {
    return this.configService.get<string>('auth.oidcIssuerDomain');
  }

  get oidcAudience(): string {
    return this.configService.get<string>('auth.oidcAudience');
  }
}
