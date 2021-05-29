import { Test, TestingModule } from '@nestjs/testing';
import { Conference } from 'conferences/entities/conference.entity';
import { User } from 'users/entities/user.entity';
import { JitsiConfigService } from '../config/jitsi/config.service';
import { JitsiService } from './jitsi.service';

const jitsiConfigService = { jwt: { enabled: true, secret: 'secret', appId: 'appId' }, host: 'https://meet.jit.si' };

const savedUser: User = {
  id: 'user-1',
  email: 'user@test.ch',
  name: 'User 1',
  participations: null,
  meetings: null,
  created_at: null,
  updated_at: null,
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

const savedConference: Conference = {
  id: 'conference-1',
  meeting: Promise.resolve(meeting),
  meetingId: 'meeting-1',
  providerProps: {
    roomName: `HuddleUp--conference-1`,
    subject: meeting.title,
  },
  publishedAt: new Date(),
  createdAt: new Date(),
  stoppedAt: new Date(),
  created_at: new Date(),
  updated_at: new Date(),
};

describe('JitsiService', () => {
  let service: JitsiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JitsiService, { provide: JitsiConfigService, useValue: jitsiConfigService }],
    }).compile();
    service = module.get<JitsiService>(JitsiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    describe('when a converence acces is created', () => {
      it('should return the created subject object', async () => {
        const subject = {
          roomName: `HuddleUp--${savedConference.id}`,
          subject: meeting.title,
        };

        const createdSubject = await service.create(savedConference);
        expect(createdSubject).toEqual(subject);
      });
    });
  });

  describe('update', () => {
    describe('when a converence acces is updated', () => {
      it('should return the updated subject object', async () => {
        const subject = {
          roomName: `HuddleUp--${savedConference.id}`,
          subject: meeting.title,
        };

        const createdSubject = await service.update(savedConference);
        expect(createdSubject).toEqual(subject);
      });
    });
  });

  describe('publish', () => {
    describe('when a converence acces is updated', () => {
      it('should return the updated subject object', async () => {
        const subject = {
          roomName: `HuddleUp--${savedConference.id}`,
          subject: meeting.title,
        };

        const createdSubject = await service.update(savedConference);
        expect(createdSubject).toEqual(subject);
      });
    });
  });

  describe('stop', () => {
    describe('when a converence acces is updated', () => {
      it('should return the updated subject object', async () => {
        const subject = {
          roomName: `HuddleUp--${savedConference.id}`,
          subject: meeting.title,
        };

        const createdSubject = await service.update(savedConference);
        expect(createdSubject).toEqual(subject);
      });
    });
  });

  describe('get-jwt-access-link', () => {
    describe('when a user and conference is provided', () => {
      it('should return the generated jwt access link', async () => {
        const accessLinkStart = 'https://meet.jit.si/HuddleUp--conference-1?jwt=';
        const accessLinkEnd = '#config.subject=%22test-meeting%22&userInfo.displayName=%22User%201%22';

        const createdAccesLink = await service.getAccessLink(savedUser, savedConference);
        expect(createdAccesLink).toContain(accessLinkStart);
        expect(createdAccesLink).toContain(accessLinkEnd);
      });
    });
  });

  describe('get-public-access-link', () => {
    describe('when a user and conference is provided', () => {
      it('should return the generated public access link', async () => {
        jitsiConfigService.jwt.enabled = false;
        const accessLink =
          'https://meet.jit.si/HuddleUp--conference-1#config.subject=%22test-meeting%22&userInfo.displayName=%22User%201%22';

        const createdAccesLink = await service.getAccessLink(savedUser, savedConference);
        expect(createdAccesLink).toEqual(accessLink);
      });
    });
  });
});
