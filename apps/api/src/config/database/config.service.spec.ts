import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConfigService } from './config.service';

const mockedValue = 'mockedValue';
const port = 3001;
const configService = {
  get: (path: string) => {
    return path === 'database.port' ? port : mockedValue;
  },
};

describe('ConfigService', () => {
  let service: DatabaseConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseConfigService, { provide: ConfigService, useValue: configService }],
    }).compile();

    service = module.get<DatabaseConfigService>(DatabaseConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the username from config service', () => {
    expect(service.username).toEqual(mockedValue);
  });

  it('should get the password from config service', () => {
    expect(service.password).toEqual(mockedValue);
  });

  it('should get the database from config service', () => {
    expect(service.database).toEqual(mockedValue);
  });

  it('should get the host from config service', () => {
    expect(service.host).toEqual(mockedValue);
  });

  it('should get the port from config service', () => {
    expect(service.port).toEqual(port);
  });
});
