import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OidcAuthService } from './oidc-auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private oidcAuthService: OidcAuthService) {}

  @Post('register')
  async register(@Body('idToken') token: string) {
    const idToken = await this.oidcAuthService.verify(token);
    if (!idToken) {
      throw new UnauthorizedException();
    }
    console.log(idToken);
    return this.authService.login({ name: idToken.name, id: idToken.sub });
  }

  @Post('login')
  async login(@Body('idToken') token: string) {
    const idToken = await this.oidcAuthService.verify(token);
    if (!idToken) {
      throw new UnauthorizedException();
    }
    return this.authService.login({ name: idToken.name, id: idToken.sub });
  }
}
