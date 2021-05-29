import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when user with ID exists', () => {
      it('should return the user object', async () => {
        const id = 'user-1';
        const expectedUser: Partial<User> = { id, name: 'User 1' };

        usersRepository.findOne.mockReturnValue(expectedUser);
        const user = await service.findOne({ id });
        expect(user).toEqual(expectedUser);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async (done) => {
        const id = '1';
        usersRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne({ id });
          done();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`User #${id} not found`);
        }
      });
    });
  });

  describe('findAll', () => {
    describe('when users exist', () => {
      it('should return an array of user objects', async () => {
        const userId1 = { id: 'user-1', title: 'User 1' };
        const userId2 = { id: 'user-2', title: 'User 2' };
        const extectedUserArray: Partial<User>[] = [userId1, userId2];

        usersRepository.find.mockReturnValue(extectedUserArray);
        const user = await service.findAll();
        expect(user).toEqual(extectedUserArray);
      });
    });

    describe('otherwise', () => {
      it('should return an emty array', async () => {
        const extectedUserArray = [];

        usersRepository.find.mockReturnValue(extectedUserArray);
        const user = await service.findAll();
        expect(user).toEqual(extectedUserArray);
      });
    });
  });

  describe('create', () => {
    const newUser: Partial<User> = {
      email: 'user@test.ch',
      name: 'User 1',
    };

    describe('when a new user was created', () => {
      it('should return the saved user object', async () => {
        const presavedUser: Partial<User> = {
          email: 'user@test.ch',
          name: 'User 1',
        };
        const savedUser: Partial<User> = {
          id: 'user-1',
          ...presavedUser,
        };

        usersRepository.create.mockReturnValue(presavedUser);
        usersRepository.save.mockReturnValue(savedUser);

        const user = await service.create(newUser);
        expect(user).toEqual(savedUser);
        expect(usersRepository.save).toBeCalledWith(presavedUser);
      });
    });
  });

  describe('update', () => {
    const updateUser: Partial<User> = {
      id: 'user-1',
      email: 'user@test.ch',
      name: 'User 1',
    };

    describe('when user with ID exists', () => {
      it('should return the updated user object with ID', async () => {
        const updatedUser: Partial<User> = {
          id: 'user-1',
          name: 'User 1',
          email: 'user@test.ch',
        };

        usersRepository.findOne.mockReturnValue(updatedUser);
        usersRepository.create.mockReturnValue(updateUser);
        usersRepository.save.mockReturnValue(updatedUser);

        const user = await service.update(updateUser.id, updateUser);
        expect(usersRepository.save).toBeCalledWith(updatedUser);
        expect(user).toEqual(updatedUser);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async (done) => {
        usersRepository.findOne.mockReturnValue(undefined);

        try {
          await service.update(updateUser.id, updateUser);
          done();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`User #${updateUser.id} not found`);
          done();
        }
      });
    });
  });

  describe('remove', () => {
    const removeUser: Partial<User> = {
      id: 'user-1',
    };

    describe('when user with ID is deleted', () => {
      it('should return true', async () => {
        usersRepository.delete.mockReturnValue({ affected: 1 });

        const result = await service.remove(removeUser.id);
        expect(result).toEqual(true);
      });
    });

    describe('otherwise', () => {
      it('should return false"', async () => {
        usersRepository.delete.mockReturnValue({ affected: 0 });

        const result = await service.remove(removeUser.id);
        expect(result).toEqual(false);
      });
    });
  });
});
