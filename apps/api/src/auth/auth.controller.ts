import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { OidcAuthService } from './oidc-auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private oidcAuthService: OidcAuthService) {}

  @Post('register')
  async register(@Body() { idToken }: AuthenticateUserDto) {
    const token = await this.oidcAuthService.verify(idToken);
    if (!token) {
      throw new UnauthorizedException();
    }
    const entity = this.oidcAuthService.toAuthEntity(token);
    const authUser = await this.authService.register(entity);
    const internalToken = await this.authService.login(authUser);
    return { idToken: internalToken };
  }

  @Post('login')
  async login(@Body() { idToken }: AuthenticateUserDto) {
    const token = await this.oidcAuthService.verify(idToken);
    if (!token) {
      throw new UnauthorizedException();
    }
    const { sub, issuer } = this.oidcAuthService.toAuthEntity(token);
    const authUser = await this.authService.findOne({ sub, issuer });
    if (!authUser) {
      throw new UnauthorizedException();
    }
    const internalToken = await this.authService.login(authUser);
    return { idToken: internalToken };
  }
}
