import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthConfigModule } from '../config/auth/config.module';
import { AuthConfigService } from '../config/auth/config.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { OidcAuthService } from './oidc-auth.service';

@Module({
  imports: [
    PassportModule,
    AuthConfigModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      inject: [AuthConfigService],
      useFactory: async (authConfigService: AuthConfigService) => ({
        secret: authConfigService.secret,
        signOptions: { expiresIn: '10m' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, OidcAuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
