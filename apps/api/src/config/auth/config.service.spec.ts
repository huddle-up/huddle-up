import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthConfigService } from './config.service';

const mockedValue = 'mockedValue';
const configService = { get: (path: string) => mockedValue };
describe('ConfigService', () => {
  let service: AuthConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthConfigService, { provide: ConfigService, useValue: configService }],
    }).compile();

    service = module.get<AuthConfigService>(AuthConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the secret from config service', () => {
    expect(service.secret).toEqual(mockedValue);
  });

  it('should get the oidcIssuer from config service', () => {
    expect(service.oidcIssuer).toEqual(mockedValue);
  });

  it('should get the oidcIssuerDomain from config service', () => {
    expect(service.oidcIssuerDomain).toEqual(mockedValue);
  });

  it('should get the oidcAudience from config service', () => {
    expect(service.oidcAudience).toEqual(mockedValue);
  });
});
