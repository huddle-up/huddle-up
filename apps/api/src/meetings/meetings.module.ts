import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from 'tags/tags.module';
import { MeetingsService } from './meetings.service';
import { MeetingsResolver } from './meetings.resolver';
import { Meeting } from './entities/meeting.entity';
import { MeetingsConfigModule } from '../config/meetings/config.module';

@Module({
  imports: [MeetingsConfigModule, TagsModule, TypeOrmModule.forFeature([Meeting])],
  providers: [MeetingsResolver, MeetingsService],
  exports: [MeetingsService],
})
export class MeetingsModule {}
