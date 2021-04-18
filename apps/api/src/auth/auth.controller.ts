import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public-route.decorator';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { AuthEntity } from './interfaces/auth-entity.interface';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { OidcAuthService } from './oidc-auth.service';

@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private authService: AuthService, private oidcAuthService: OidcAuthService) {}

  @Public()
  @Post('login')
  async login(@Body() { idToken }: AuthenticateUserDto) {
    const token = await this.oidcAuthService.verify(idToken);
    if (!token) {
      throw new UnauthorizedException();
    }
    const entity = this.oidcAuthService.toAuthEntity(token);
    const { sub, issuer } = entity;
    let authUser = await this.authService.findOne({ sub, issuer });
    if (!authUser) {
      authUser = await this.register(entity);
    }
    const internalToken = await this.authService.login(authUser);
    return { idToken: internalToken };
  }

  private async register(entity: AuthEntity) {
    const authUser = await this.authService.register(entity);
    return authUser;
  }
}
