import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { JitsiConfigService } from './config.service';

const mockedValue = 'mockedValue';
const jitsiConfig = { enabled: true, appId: 'huddleUp', secret: 'secret' };
const configService = {
  get: (path: string) => {
    return path === 'jitsi.jwt' ? jitsiConfig : mockedValue;
  },
};

describe('ConfigService', () => {
  let service: JitsiConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JitsiConfigService, { provide: ConfigService, useValue: configService }],
    }).compile();

    service = module.get<JitsiConfigService>(JitsiConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the host from config service', () => {
    expect(service.host).toEqual(mockedValue);
  });

  it('should get the jwt from config service', () => {
    expect(service.jwt).toEqual(jitsiConfig);
  });
});
