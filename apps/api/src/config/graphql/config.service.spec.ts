import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { GraphqlConfigService } from './config.service';

const mockedValue = true;
const configService = { get: (path: string) => mockedValue };

describe('ConfigService', () => {
  let service: GraphqlConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphqlConfigService, { provide: ConfigService, useValue: configService }],
    }).compile();

    service = module.get<GraphqlConfigService>(GraphqlConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the playground from config service', () => {
    expect(service.playground).toEqual(mockedValue);
  });
});
