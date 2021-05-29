import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Meeting } from '../meetings/entities/meeting.entity';
import { MeetingsService } from '../meetings/meetings.service';
import { ParticipationsService } from './participations.service';
import { Participation } from './entities/participation.entity';
import { CreateParticipation } from './interfaces/create-participation.interface';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

const meetingService = { findOne: (meeting: Partial<Meeting>) => Promise.resolve({ id: 'meeting-1', ...meeting }) };

describe('ParticipationsService', () => {
  let service: ParticipationsService;
  let participationsRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipationsService,
        {
          provide: getRepositoryToken(Participation),
          useValue: createMockRepository(),
        },
        { provide: MeetingsService, useValue: meetingService },
      ],
    }).compile();

    service = module.get<ParticipationsService>(ParticipationsService);
    participationsRepository = module.get<MockRepository>(getRepositoryToken(Participation));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when participation with ID exists', () => {
      it('should return the participation object', async () => {
        const id = 'participation-1';
        const expectedParticipation: Partial<Participation> = { id, meetingId: 'meeting-1' };

        participationsRepository.findOne.mockReturnValue(expectedParticipation);
        const participation = await service.findOne({ id });
        expect(participation).toEqual(expectedParticipation);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async (done) => {
        const id = '1';
        participationsRepository.findOne.mockReturnValue(undefined);

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

  describe('find', () => {
    describe('when meetings with MEETING_ID exist', () => {
      it('should return an array of meeting objects', async () => {
        const participantId1 = { id: 'participation-1', meetingId: 'meeting-1' };
        const participantId2 = { id: 'participation-2', meetingId: 'meeting-1' };
        const extectedParticipantsArray: Partial<Participation>[] = [participantId1, participantId2];

        participationsRepository.find.mockReturnValue(extectedParticipantsArray);
        const meeting = await service.find({ meetingId: 'meeting-1' });
        expect(meeting).toEqual(extectedParticipantsArray);
      });
    });

    describe('otherwise', () => {
      it('should return an emty array', async () => {
        const extectedParticipantsArray = [];

        participationsRepository.find.mockReturnValue(extectedParticipantsArray);
        const participation = await service.find({ meetingId: 'meeting-3' });
        expect(participation).toEqual(extectedParticipantsArray);
      });
    });
  });

  describe('create', () => {
    const meetingId = 'meeting-1';
    const userId = 'user-1';
    const createParticipation: CreateParticipation = { meetingId, userId };

    describe('when a new participation was created', () => {
      it('should return the saved participation object', async () => {
        const presavedParticipation: Partial<Participation> = { meetingId, userId };
        const savedParticipation: Partial<Participation> = {
          id: 'participation-1',
          ...presavedParticipation,
        };

        participationsRepository.create.mockReturnValue(presavedParticipation);
        participationsRepository.save.mockReturnValue(savedParticipation);

        const participation = await service.create(createParticipation);
        expect(participation).toEqual(savedParticipation);
        expect(participationsRepository.save).toBeCalledWith(presavedParticipation);
      });
    });
  });

  describe('remove', () => {
    const removeParticipation: Partial<Participation> = {
      id: 'participation-1',
    };

    describe('when participations with ID is deleted', () => {
      it('should return true', async () => {
        participationsRepository.delete.mockReturnValue({ affected: 1 });

        const result = await service.remove(removeParticipation.id);
        expect(result).toEqual(true);
      });
    });

    describe('otherwise', () => {
      it('should return false"', async () => {
        participationsRepository.delete.mockReturnValue({ affected: 0 });

        const result = await service.remove(removeParticipation.id);
        expect(result).toEqual(false);
      });
    });
  });
});
