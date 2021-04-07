import { Test, TestingModule } from '@nestjs/testing';
import { MeetingsResolver } from './meetings.resolver';
import { MeetingsService } from './meetings.service';

describe('MeetingsResolver', () => {
  let resolver: MeetingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetingsResolver, MeetingsService],
    }).compile();

    resolver = module.get<MeetingsResolver>(MeetingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
