import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTag } from './interfaces/create-tag.interface';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private readonly tagRepository: Repository<Tag>) {}

  async create(newTag: CreateTag) {
    const tag = this.tagRepository.create(newTag);
    return this.tagRepository.save(tag);
  }

  async findAll() {
    return this.tagRepository.find();
  }

  async findOne(entity: Partial<Tag>) {
    return this.tagRepository.findOne(entity);
  }

  async findOrCreate(tags: Partial<Tag>[]) {
    const resolvedTags = tags.map(({ id, name }) => {
      if (id) {
        return this.findOne({ id });
      }
      return this.create({ name });
    });
    return Promise.all(resolvedTags);
  }

  async remove(id: number) {
    const result: DeleteResult = await this.tagRepository.delete(id);
    return result.affected === 1;
  }
}
