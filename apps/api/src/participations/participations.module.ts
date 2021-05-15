import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingsModule } from '../meetings/meetings.module';
import { Participation } from './entities/participation.entity';
import { ParticipationsResolver } from './participations.resolver';
import { ParticipationsService } from './participations.service';

@Module({
  imports: [MeetingsModule, TypeOrmModule.forFeature([Participation])],
  providers: [ParticipationsResolver, ParticipationsService],
  exports: [ParticipationsService],
})
export class ParticipationsModule {}
