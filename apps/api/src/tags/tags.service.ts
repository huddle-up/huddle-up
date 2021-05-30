import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as fs from 'fs';
import { Tag } from './entities/tag.entity';
import { CreateTag } from './interfaces/create-tag.interface';
import { getEnvPath } from '../config/utils';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private readonly tagRepository: Repository<Tag>) {}

  async onModuleInit() {
    const tagsArray = await this.getPredefinedTags();
    const tags: Partial<Tag>[] = tagsArray.map((name) => {
      return {
        name,
        predefined: true,
      };
    });

    this.findOrCreate(tags);
  }

  private getPredefinedTags(): Promise<string[]> {
    try {
      const tagsConfigPath = getEnvPath('tags.json');
      if (!fs.existsSync(tagsConfigPath)) {
        return Promise.resolve([]);
      }
      return JSON.parse(fs.readFileSync(tagsConfigPath, 'utf8')).tags;
    } catch (e) {
      return Promise.resolve([]);
    }
  }

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
    const resolvedTags = tags.map(async ({ id, name, predefined }) => {
      if (id) {
        return this.findOne({ id });
      }
      const tag = name && (await this.findOne({ name }));
      if (tag) {
        return tag;
      }
      return this.create({ name, predefined });
    });
    return Promise.all(resolvedTags);
  }

  async update(partialTag: Partial<Tag>) {
    const tag = await this.tagRepository.findOne({ id: partialTag.id });
    if (!tag) {
      throw new NotFoundException(`Tag #${partialTag.id} not found`);
    }
    if (tag.predefined) {
      throw new BadRequestException(`Tag #${partialTag.id} is predefined and can't be changed`);
    }
    await this.tagRepository.save(tag);
    return this.tagRepository.findOne({ id: partialTag.id });
  }

  async remove(id: number) {
    const result: DeleteResult = await this.tagRepository.delete(id);
    return result.affected === 1;
  }
}
