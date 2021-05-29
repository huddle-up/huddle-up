import { Test, TestingModule } from '@nestjs/testing';
import { Conference } from 'conferences/entities/conference.entity';
import { User } from 'users/entities/user.entity';
import { AuthConfigService } from '../config/auth/config.service';
import { AuthEntity } from './interfaces/auth-entity.interface';
import { OidcIdToken } from './interfaces/oidc-id-token.interface';
import { OidcAuthService } from './oidc-auth.service';

const authConfigService = {
  oidcIssuer: 'oidc-issuer',
  oidcAudience: 'oidc-audience',
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
  providerProps: null,
  publishedAt: null,
  createdAt: null,
  stoppedAt: null,
  created_at: null,
  updated_at: null,
};

describe('OidcAuthService', () => {
  let service: OidcAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OidcAuthService, { provide: AuthConfigService, useValue: authConfigService }],
    }).compile();

    service = module.get<OidcAuthService>(OidcAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('verify', () => {
    describe('when a token is provided', () => {
      it('should return the oidc-token object', async () => {
        const token =
          'https://meet.jit.si/HuddleUp--conference-1?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJqaXRzaSIsInN1YiI6Imh0dHBzOi8vbWVldC5qaXQuc2kiLCJpc3MiOiJhcHBJZCIsInJvb20iOiJIdWRkbGVVcC0tY29uZmVyZW5jZS0xIiwibW9kZXJhdG9yIjp0cnVlLCJjb250ZXh0Ijp7InVzZXIiOnsibmFtZSI6IlVzZXIgMSIsImlkIjoidXNlci0xIiwiZW1haWwiOiJ1c2VyQHRlc3QuY2gifX0sImlhdCI6MTYyMjMwMTY0N30.n6_1nPIQdjqogq5frYKpvLDjBUxmISbPzD6kzbTl9FA#config.subject=%22test-meeting%22&userInfo.displayName=%22User%201%22';
        const verifiedToken = await service.verify(token);
        expect(verifiedToken).toEqual(null);
      });
    });
  });

  describe('toAuthEntity', () => {
    describe('when a oidc token is provided', () => {
      it('should return the auth-entity', async () => {
        const oidcToken: OidcIdToken = {
          name: 'name',
          email: 'email',
          nickname: 'name',
          picture: 'name',
          sub: 'sub',
          iss: 'issuer',
        };
        const authEntity: AuthEntity = {
          sub: 'sub',
          issuer: oidcToken.iss,
          name: 'name',
          email: 'email',
          nickname: 'name',
          picture: 'name',
        };
        const createdAuthEntity = await service.toAuthEntity(oidcToken);
        expect(createdAuthEntity).toEqual(authEntity);
      });
    });
  });
});
