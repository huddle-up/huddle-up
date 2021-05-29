import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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

  async update(id: string, partialUser: Partial<User>) {
    const user = await this.usersRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    await this.usersRepository.save({ id, ...partialUser });
    return this.usersRepository.findOne({ id });
  }

  async remove(id: string) {
    const result: DeleteResult = await this.usersRepository.delete(id);
    return result.affected === 1;
  }
}
