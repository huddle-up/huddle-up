import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Tag } from './entities/tag.entity';
import { TagsService } from './tags.service';
import { CreateTag } from './interfaces/create-tag.interface';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

describe('MeetingsService', () => {
  let service: TagsService;
  let tagsRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(Tag),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
    tagsRepository = module.get<MockRepository>(getRepositoryToken(Tag));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when tag with ID exists', () => {
      it('should return the tag object', async () => {
        const id = 1;
        const expectedTag: Partial<Tag> = { id, name: 'Tag 1' };

        tagsRepository.findOne.mockReturnValue(expectedTag);
        const tag = await service.findOne({ id });
        expect(tag).toEqual(expectedTag);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async (done) => {
        const id = 1;
        tagsRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne({ id });
          done();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Tag #${id} not found`);
        }
      });
    });
  });

  describe('findOrCreate', () => {
    describe('when one tag with ID exists and one should be created', () => {
      it('should return the both saved tags array', async () => {
        const existingTag = { id: 1, name: 'tag-1' };
        const newTag = { name: 'new-tag' };
        const newTagSaved = { id: 2, name: 'new-tag' };
        const unsavedTagsArray: Partial<Tag>[] = [newTag, existingTag];
        const savedTagsArray: Partial<Tag>[] = [newTagSaved, existingTag];

        tagsRepository.findOne.mockReturnValue(existingTag);
        tagsRepository.create.mockReturnValue(newTagSaved);
        tagsRepository.save.mockReturnValue(newTagSaved);
        const foundTags = await service.findOrCreate(unsavedTagsArray);
        expect(foundTags).toEqual(savedTagsArray);
      });
    });
  });

  describe('findAll', () => {
    describe('when tags exist', () => {
      it('should return an array of tag objects', async () => {
        const tagId1 = { id: 1, title: 'Tag 2' };
        const tagId2 = { id: 2, title: 'Tag 2' };
        const extectedTagArray: Partial<Tag>[] = [tagId1, tagId2];

        tagsRepository.find.mockReturnValue(extectedTagArray);
        const tag = await service.findAll();
        expect(tag).toEqual(extectedTagArray);
      });
    });

    describe('otherwise', () => {
      it('should return an emty array', async () => {
        const extectedTagArray = [];

        tagsRepository.find.mockReturnValue(extectedTagArray);
        const tag = await service.findAll();
        expect(tag).toEqual(extectedTagArray);
      });
    });
  });

  describe('create', () => {
    const newTag: CreateTag = {
      name: 'Tag 5',
    };

    describe('when a new tag was created', () => {
      it('should return the saved tag object', async () => {
        const presavedTag: Tag = {
          id: 5,
          name: newTag.name,
          meetings: null,
          created_at: null,
          updated_at: null,
        };
        const savedTag: Partial<Tag> = {
          ...presavedTag,
          created_at: new Date(),
          updated_at: new Date(),
        };

        tagsRepository.create.mockReturnValue(presavedTag);
        tagsRepository.save.mockReturnValue(savedTag);

        const tag = await service.create(newTag);
        expect(tag).toEqual(savedTag);
        expect(tagsRepository.save).toBeCalledWith(presavedTag);
      });
    });
  });

  describe('update', () => {
    const updateTag: Partial<Tag> = {
      id: 1,
      name: 'Tag 1',
    };

    describe('when tag with ID exists', () => {
      it('should return the updated tag object with ID', async () => {
        const updatedTag: Partial<Tag> = {
          id: 1,
          name: 'Tag 1',
        };

        tagsRepository.findOne.mockReturnValue(updatedTag);
        tagsRepository.create.mockReturnValue(updateTag);
        tagsRepository.save.mockReturnValue(updatedTag);

        const user = await service.update(updateTag);
        expect(tagsRepository.save).toBeCalledWith(updatedTag);
        expect(user).toEqual(updatedTag);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async (done) => {
        tagsRepository.findOne.mockReturnValue(undefined);

        try {
          await service.update(updateTag);
          done();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Tag #${updateTag.id} not found`);
          done();
        }
      });
    });
  });

  describe('remove', () => {
    const removeTag: Partial<Tag> = {
      id: 1,
    };

    describe('when user with ID is deleted', () => {
      it('should return true', async () => {
        tagsRepository.delete.mockReturnValue({ affected: 1 });

        const result = await service.remove(removeTag.id);
        expect(result).toEqual(true);
      });
    });

    describe('otherwise', () => {
      it('should return false"', async () => {
        tagsRepository.delete.mockReturnValue({ affected: 0 });

        const result = await service.remove(removeTag.id);
        expect(result).toEqual(false);
      });
    });
  });
});
