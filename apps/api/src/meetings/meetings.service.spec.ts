import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Tag } from '../tags/entities/tag.entity';
import { Meeting } from './entities/meeting.entity';
import { MeetingsService } from './meetings.service';
import { MeetingsConfigService } from '../config/meetings/config.service';
import { TagsService } from '../tags/tags.service';
import { CreateMeeting } from './interfaces/create-meeting.interface';
import { UpdateMeeting } from './interfaces/update-meeting.inferface';
import { SearchCriteria } from './interfaces/search-criteria.interface';
import { OrderBy } from './enums/OrderBy.enum';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  findAndCount: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
  }),
});

const meetingsConfigService = { preparationTime: 30 };
const tagService = { findOrCreate: (tags: Partial<Tag>[]) => Promise.resolve([tags]) };

describe('MeetingsService', () => {
  let service: MeetingsService;
  let meetingRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeetingsService,
        { provide: MeetingsConfigService, useValue: meetingsConfigService },
        { provide: TagsService, useValue: tagService },
        {
          provide: getRepositoryToken(Meeting),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<MeetingsService>(MeetingsService);
    meetingRepository = module.get<MockRepository>(getRepositoryToken(Meeting));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when meeting with ID exists', () => {
      it('should return the meeting object', async () => {
        const id = 'meeting-1';
        const expectedMeeting: Partial<Meeting> = { id, title: 'Meeting 1' };

        meetingRepository.findOne.mockReturnValue(expectedMeeting);
        const meeting = await service.findOne({ id });
        expect(meeting).toEqual(expectedMeeting);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async (done) => {
        const id = '1';
        meetingRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne({ id });
          done();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Meeting #${id} not found`);
        }
      });
    });
  });

  describe('findAll', () => {
    describe('when meetings exist', () => {
      it('should return an array of meeting objects', async () => {
        const meetingId1 = { id: 'meeeting-1', title: 'Meeting 1' };
        const meetingId2 = { id: 'meeeting-2', title: 'Meeting 2' };
        const extectedMeetingArray: Partial<Meeting>[] = [meetingId1, meetingId2];

        meetingRepository.find.mockReturnValue(extectedMeetingArray);
        const meeting = await service.findAll();
        expect(meeting).toEqual(extectedMeetingArray);
      });
    });

    describe('otherwise', () => {
      it('should return an emty array', async () => {
        const extectedMeetingArray = [];

        meetingRepository.find.mockReturnValue(extectedMeetingArray);
        const meeting = await service.findAll();
        expect(meeting).toEqual(extectedMeetingArray);
      });
    });
  });

  describe('find', () => {
    describe('when meetings with TITLE exist', () => {
      it('should return an array of meeting objects', async () => {
        const meetingId1 = { id: 'meeeting-1', title: 'Meeting 1' };
        const meetingId2 = { id: 'meeeting-2', title: 'Meeting 2' };
        const extectedMeetingArray: Partial<Meeting>[] = [meetingId1, meetingId2];

        meetingRepository.find.mockReturnValue(extectedMeetingArray);
        const meeting = await service.find({ title: 'Meeting' });
        expect(meeting).toEqual(extectedMeetingArray);
      });
    });

    describe('otherwise', () => {
      it('should return an emty array', async () => {
        const extectedMeetingArray = [];

        meetingRepository.find.mockReturnValue(extectedMeetingArray);
        const meeting = await service.find({ title: 'Meeting 3' });
        expect(meeting).toEqual(extectedMeetingArray);
      });
    });
  });

  describe('create', () => {
    const newMeeting: CreateMeeting = {
      title: 'Meeting 1',
      hostId: 'host-1',
      startDate: new Date('2021-06-18T10:00:00Z'),
      endDate: new Date('2021-06-18T11:00:00Z'),
      tags: [],
    };

    describe('when a new meeting was created', () => {
      it('should return the saved meeting object', async () => {
        const presavedMeeting: Partial<Meeting> = {
          title: 'Meeting 1',
          hostId: 'host-1',
          startDate: new Date('2021-06-18T10:00:00Z'),
          endDate: new Date('2021-06-18T11:00:00Z'),
          tags: Promise.resolve([]),
          prepareDate: new Date('2021-06-18T09:30:00Z'),
        };
        const savedMeeting: Partial<Meeting> = {
          id: 'meeting-1',
          ...presavedMeeting,
        };

        meetingRepository.create.mockReturnValue({ ...newMeeting, prepareDate: new Date() });
        meetingRepository.save.mockReturnValue(savedMeeting);

        const meeting = await service.create(newMeeting);
        expect(meeting).toEqual(savedMeeting);
        expect(meetingRepository.save).toBeCalledWith(presavedMeeting);
      });
    });
  });

  describe('update', () => {
    const updateMeeting: UpdateMeeting = {
      id: 'meeting-1',
      title: 'Meeting 1',
      hostId: 'host-1',
      startDate: new Date('2021-06-18T10:00:00Z'),
      endDate: new Date('2021-06-18T11:00:00Z'),
      tags: [],
    };

    describe('when meeting with ID exists', () => {
      it('should return the updated meeting object with ID', async () => {
        const updatedMeeting: Partial<Meeting> = {
          id: 'meeting-1',
          title: 'Meeting 1',
          hostId: 'host-1',
          startDate: new Date('2021-06-18T10:00:00Z'),
          endDate: new Date('2021-06-18T11:00:00Z'),
          tags: Promise.resolve([]),
          prepareDate: new Date('2021-06-18T09:30:00Z'),
        };

        meetingRepository.findOne.mockReturnValue(updatedMeeting);
        meetingRepository.create.mockReturnValue({ ...updateMeeting, prepareDate: new Date() });
        meetingRepository.save.mockReturnValue(updatedMeeting);

        const meeting = await service.update(updateMeeting);
        expect(meetingRepository.save).toBeCalledWith(updatedMeeting);
        expect(meeting).toEqual(updatedMeeting);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async (done) => {
        meetingRepository.findOne.mockReturnValue(undefined);

        try {
          await service.update(updateMeeting);
          done();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Meeting #${updateMeeting.id} not found`);
          done();
        }
      });
    });
  });

  describe('search', () => {
    describe('when meetings with all search criterias provided exists', () => {
      it('should return an object with totalCount and meeting array', async () => {
        const searchCriteria: SearchCriteria = {
          searchValue: 'test-meeting',
          startDateOrderBy: OrderBy.ASC,
          tags: [{ id: 1 }, { id: 2 }],
          fromDate: new Date('2021-06-18T10:00:00Z'),
          toDate: new Date('2021-06-18T11:00:00Z'),
        };
        const hostId = 'host-1';
        const meetings: Partial<Meeting>[] = [{ id: 'meeting-1', title: 'test-meeting' }];
        const totalCount = 1;
        const { searchValue, tags, fromDate, toDate } = searchCriteria;

        const query = meetingRepository.createQueryBuilder('meeting');
        query.getManyAndCount.mockReturnValue(Promise.resolve([meetings, totalCount]));

        const meeting = await service.search(searchCriteria, hostId);

        expect(meeting).toEqual({ meetings, totalCount });

        // additional checks to proof the existence of some queries in private methods
        expect(query.andWhere).toHaveBeenCalledWith(
          '(meeting.title LIKE :search OR meeting.description LIKE :search)',
          {
            search: `%${searchValue}%`,
          }
        );
        expect(query.andWhere).toHaveBeenCalledWith('meeting.hostId = :hostId', { hostId });
        expect(query.andWhere).toHaveBeenCalledWith('meeting.startDate BETWEEN :fromDate AND :toDate', {
          fromDate,
          toDate,
        });
        expect(query.innerJoin).toHaveBeenCalledWith('meeting.tags', 'tag', 'tag.id IN (:...tagIds)', {
          tagIds: tags.map((t) => t.id),
        });
      });
    });

    describe('otherwise', () => {
      const searchCriteria: SearchCriteria = {
        searchValue: 'not-existent-meeting',
        startDateOrderBy: OrderBy.ASC,
      };
      it('should return an object with totalCount of 0 and an empty array', async () => {
        const meetings: Meeting[] = [];
        const totalCount = 0;

        const query = meetingRepository.createQueryBuilder('meeting');
        query.getManyAndCount.mockReturnValue(Promise.resolve([meetings, totalCount]));

        const meeting = await service.search(searchCriteria);

        expect(meeting).toEqual({ meetings, totalCount });
      });
    });
  });
});
