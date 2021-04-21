import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingsService } from './meetings.service';
import { MeetingsResolver } from './meetings.resolver';
import { Meeting } from './entities/meeting.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Meeting])],
  providers: [MeetingsResolver, MeetingsService],
})
export class MeetingsModule {}
