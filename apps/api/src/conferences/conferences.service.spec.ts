import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { JitsiService } from '../jitsi/jitsi.service';
import { User } from '../users/entities/user.entity';
import { ConferencesService } from './conferences.service';
import { Conference } from './entities/conference.entity';
import { CreateConference } from './interfaces/create-conference.interface';
import { CONFERENCE_PROVIDER } from './interfaces/conference-provider.interface';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

const jitsiService = {
  create: (conference: Conference) =>
    Promise.resolve({
      roomName: `HuddleUp--${conference.id}`,
      subject: 'meeting subject',
    }),
  publish: (conference: Conference) => Promise.resolve(conference.providerProps),
  stop: (conference: Conference) => Promise.resolve(conference.providerProps),
  getAccessLink: (user: User, conference: Conference) =>
    Promise.resolve(`https://meet.jit.si/${conference.id}?displayName=${user.name}`),
};

const meeting = {
  id: 'meeting-1',
  title: 'test-meeting',
  hostId: 'user-1',
  startDate: new Date(),
  endDate: new Date(),
  host: null,
  participations: null,
  tags: null,
  created_at: null,
  updated_at: null,
  prepareDate: null,
  conference: null,
};

describe('ConferencesService', () => {
  let service: ConferencesService;
  let conferencesRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConferencesService,
        {
          provide: getRepositoryToken(Conference),
          useValue: createMockRepository(),
        },
        { provide: CONFERENCE_PROVIDER, useValue: jitsiService },
      ],
    }).compile();

    service = module.get<ConferencesService>(ConferencesService);
    conferencesRepository = module.get<MockRepository>(getRepositoryToken(Conference));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when conference with ID exists', () => {
      it('should return the conference object', async () => {
        const id = 'conference-1';
        const expectedConference: Partial<Conference> = { id, meetingId: 'meeting-1' };

        conferencesRepository.findOne.mockReturnValue(expectedConference);
        const conference = await service.findOne({ id });
        expect(conference).toEqual(expectedConference);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async (done) => {
        const id = 'conference-2';
        conferencesRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne({ id });
          done();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Participant #${id} not found`);
        }
      });
    });
  });

  describe('create', () => {
    describe('when a new conference was created', () => {
      it('should return the saved conference object', async () => {
        const createConference: CreateConference = { meeting };
        const savedConference: Conference = {
          id: 'conference-1',
          ...createConference,
          meeting: Promise.resolve(meeting),
          meetingId: 'meeting-1',
          providerProps: null,
          publishedAt: null,
          createdAt: null,
          stoppedAt: null,
          created_at: null,
          updated_at: null,
        };
        const conferencWithAddedProviderProps = {
          ...savedConference,
          providerProps: jitsiService.create(savedConference),
        };

        conferencesRepository.findOne.mockReturnValue(undefined);
        conferencesRepository.create.mockReturnValue(savedConference);
        conferencesRepository.save.mockReturnValue(conferencWithAddedProviderProps);

        const conference = await service.create(createConference);
        expect(conference).toEqual(conferencWithAddedProviderProps);
      });
    });
  });

  describe('publish', () => {
    describe('when a conference is published', () => {
      it('should publish conference and return the saved conference object', async () => {
        const savedConference: Conference = {
          id: 'conference-1',
          meeting: Promise.resolve(meeting),
          meetingId: 'meeting-1',
          providerProps: null,
          publishedAt: null,
          createdAt: null,
          stoppedAt: null,
          created_at: null,
          updated_at: null,
        };
        const conferencWithPublishedProviderProps = {
          ...savedConference,
          providerProps: jitsiService.publish(savedConference),
          publishedAt: new Date(),
        };

        conferencesRepository.save.mockReturnValue(conferencWithPublishedProviderProps);

        const conference = await service.publish(savedConference);
        expect(conference).toEqual(conferencWithPublishedProviderProps);
      });
    });
  });

  describe('stop', () => {
    describe('when a conference is stopped', () => {
      it('should stop conference and  return the saved conference object', async () => {
        const savedConference: Conference = {
          id: 'conference-1',
          meeting: Promise.resolve(meeting),
          meetingId: 'meeting-1',
          providerProps: null,
          publishedAt: null,
          createdAt: null,
          stoppedAt: null,
          created_at: null,
          updated_at: null,
        };
        const conferencWithStoppedProviderProps = {
          ...savedConference,
          providerProps: jitsiService.stop(savedConference),
          stoppedAt: new Date(),
        };

        conferencesRepository.save.mockReturnValue(conferencWithStoppedProviderProps);

        const conference = await service.stop(savedConference);
        expect(conference).toEqual(conferencWithStoppedProviderProps);
      });
    });
  });

  describe('getAccessLink', () => {
    describe('when a access user and conference is provided', () => {
      it('should return the access link of the conference for the provided user', async () => {
        const savedConference: Conference = {
          id: 'conference-1',
          meeting: Promise.resolve(meeting),
          meetingId: 'meeting-1',
          providerProps: null,
          publishedAt: null,
          createdAt: null,
          stoppedAt: null,
          created_at: null,
          updated_at: null,
        };
        const savedUser: User = {
          id: 'user-1',
          email: 'user@test.ch',
          name: 'User 1',
          participations: null,
          meetings: null,
          created_at: null,
          updated_at: null,
        };
        const accessLink = await jitsiService.getAccessLink(savedUser, savedConference);
        const conference = await service.getAccessLink(savedUser, savedConference);
        expect(conference).toEqual(accessLink);
      });
    });
  });
});
