import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { AuthUser } from './entities/auth-user.entity';
import { AuthEntity } from './interfaces/auth-entity.interface';
import { IdTokenUserData } from './interfaces/id-token.interface';
import { OidcIdToken } from './interfaces/oidc-id-token.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    @InjectRepository(AuthUser) private readonly authUserRepository: Repository<AuthUser>
  ) {}

  async login({ sub, issuer }: AuthEntity) {
    const authUser = await this.authUserRepository.findOne({ sub, issuer });
    return this.sign({ sub: authUser.sub, email: authUser.email, userId: authUser.userId });
  }

  async register(entity: AuthEntity): Promise<AuthUser> {
    const { sub, email, issuer, name } = entity;
    // Check if a user is already registered
    const existing = await this.authUserRepository.findOne({ sub, issuer });
    if (existing) {
      return existing;
    }
    const user = await this.usersService.create({ email, name });
    const authUser = this.authUserRepository.create({ sub, issuer, email, userId: user.id });
    return this.authUserRepository.save(authUser);
  }

  async update(user: AuthUser) {
    return this.authUserRepository.save(user);
  }

  async findOne(entity: Partial<AuthUser>) {
    return this.authUserRepository.findOne(entity);
  }

  async remove(sub: string, issuer: string) {
    const result = await this.authUserRepository.delete({ sub, issuer });
    return result.affected === 1;
  }

  private async sign(userTokenData: IdTokenUserData) {
    return this.jwtService.signAsync(userTokenData);
  }
}
