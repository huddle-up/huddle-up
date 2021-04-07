import { Module } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingsResolver } from './meetings.resolver';

@Module({
  providers: [MeetingsResolver, MeetingsService]
})
export class MeetingsModule {}
