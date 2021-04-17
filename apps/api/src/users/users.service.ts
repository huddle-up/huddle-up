import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async create(newUser: Partial<User>) {
    const user = this.usersRepository.create(newUser);
    return this.usersRepository.save(user);
  }

  async findOne(entity: Partial<User>) {
    return this.usersRepository.findOne(entity);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async update(user: Partial<User>) {
    return this.usersRepository.save(user);
  }
}
