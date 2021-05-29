import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MeetingsConfigService } from './config.service';

const preparationTime = 20;
const configService = { get: (path: string) => preparationTime };
describe('ConfigService', () => {
  let service: MeetingsConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetingsConfigService, { provide: ConfigService, useValue: configService }],
    }).compile();

    service = module.get<MeetingsConfigService>(MeetingsConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the preparationTime from config service', () => {
    expect(service.preparationTime).toEqual(preparationTime);
  });
});
