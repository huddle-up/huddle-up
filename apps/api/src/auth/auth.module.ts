import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthConfigModule } from '../config/auth/config.module';
import { AuthConfigService } from '../config/auth/config.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { OidcAuthService } from './oidc-auth.service';
import { AuthUser } from './entities/auth-user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    AuthConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      inject: [AuthConfigService],
      useFactory: async (authConfigService: AuthConfigService) => ({
        secret: authConfigService.secret,
        signOptions: { expiresIn: '60m' },
      }),
    }),
    TypeOrmModule.forFeature([AuthUser]),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy, OidcAuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
