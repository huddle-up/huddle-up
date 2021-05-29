import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { AuthUser } from './entities/auth-user.entity';
import { AuthService } from './auth.service';
import { IdTokenUserData } from './interfaces/id-token.interface';
import { AuthEntity } from './interfaces/auth-entity.interface';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

const jwtService = {
  signAsync: (payload: IdTokenUserData) => Promise.resolve(`signed-token-${payload.userId}`),
};

const usersService = {
  create: (newUser: Partial<User>) => Promise.resolve({ id: 'user-1', ...newUser }),
};

const inputAuthUser: Partial<AuthUser> = { sub: 'sub', issuer: 'issuer', email: 'test@test.ch' };

describe('AuthService', () => {
  let service: AuthService;
  let authUserRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(AuthUser),
          useValue: createMockRepository(),
        },
        { provide: JwtService, useValue: jwtService },
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authUserRepository = module.get<MockRepository>(getRepositoryToken(AuthUser));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when auth-user with ID exists', () => {
      it('should return the auth-user object', async () => {
        const expectedAuthUser: Partial<AuthUser> = { sub: 'sub', issuer: 'issuer', email: 'test@test.ch' };

        authUserRepository.findOne.mockReturnValue(expectedAuthUser);
        const authUser = await service.findOne(expectedAuthUser);
        expect(authUser).toEqual(expectedAuthUser);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async (done) => {
        const expectedAuthUser: Partial<AuthUser> = { sub: 'sub', issuer: 'issuer', email: 'test@test.ch' };
        authUserRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(expectedAuthUser);
          done();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`AuthUser #${expectedAuthUser.sub}-${expectedAuthUser.issuer} not found`);
        }
      });
    });
  });

  describe('register', () => {
    const registerEntity: AuthEntity = {
      sub: 'sub',
      issuer: 'issuer',
      email: 'user@test.ch',
      name: 'user@test.ch',
      nickname: null,
      picture: null,
    };
    describe('when a new auth-user was registered', () => {
      it('should return the saved auth-user object with the user created', async () => {
        const savedUser: User = {
          id: 'user-1',
          email: 'user@test.ch',
          name: 'User 1',
          participations: null,
          meetings: null,
          created_at: null,
          updated_at: null,
        };

        const presavedAuthUser: AuthUser = {
          sub: 'sub',
          issuer: 'issuer',
          email: 'user@test.ch',
          user: null,
          userId: null,
          created_at: null,
          updated_at: null,
        };

        const savedAuthUser: AuthUser = {
          sub: 'sub',
          issuer: 'issuer',
          email: 'user@test.ch',
          user: Promise.resolve(savedUser),
          userId: savedUser.id,
          created_at: null,
          updated_at: null,
        };

        authUserRepository.findOne.mockReturnValue(undefined);
        authUserRepository.create.mockReturnValue(presavedAuthUser);
        authUserRepository.save.mockReturnValue(savedAuthUser);

        const authUser = await service.register(registerEntity);
        expect(authUser).toEqual(savedAuthUser);
        expect(authUserRepository.save).toBeCalledWith(presavedAuthUser);
      });
    });
  });

  describe('login', () => {
    const loginEntity: AuthEntity = {
      sub: 'sub',
      issuer: 'issuer',
      email: 'user@test.ch',
      name: 'user@test.ch',
      nickname: null,
      picture: null,
    };
    describe('when a user logs-in', () => {
      it('should return the signed auth-user object', async () => {
        const savedUser: User = {
          id: 'user-1',
          email: 'user@test.ch',
          name: 'User 1',
          participations: null,
          meetings: null,
          created_at: null,
          updated_at: null,
        };

        const savedAuthUser: AuthUser = {
          sub: 'sub',
          issuer: 'issuer',
          email: 'user@test.ch',
          user: Promise.resolve(savedUser),
          userId: savedUser.id,
          created_at: null,
          updated_at: null,
        };

        const token = await jwtService.signAsync(savedAuthUser);
        authUserRepository.findOne.mockReturnValue(savedAuthUser);
        const signedToken = await service.login(loginEntity);
        expect(signedToken).toEqual(token);
      });
    });
  });

  describe('remove', () => {
    describe('when auth-user with SUB and ISSUER is deleted', () => {
      it('should return true', async () => {
        authUserRepository.delete.mockReturnValue({ affected: 1 });

        const result = await service.remove(inputAuthUser.sub, inputAuthUser.issuer);
        expect(result).toEqual(true);
      });
    });

    describe('otherwise', () => {
      it('should return false"', async () => {
        authUserRepository.delete.mockReturnValue({ affected: 0 });

        const result = await service.remove(inputAuthUser.sub, inputAuthUser.issuer);
        expect(result).toEqual(false);
      });
    });
  });
});
