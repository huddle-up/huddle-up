import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeetingsService } from '../meetings/meetings.service';
import { Participation } from './entities/participation.entity';
import { CreateParticipation } from './interfaces/create-participation.interface';

@Injectable()
export class ParticipationsService {
  constructor(
    private readonly meetingsService: MeetingsService,
    @InjectRepository(Participation) private readonly participationsRepository: Repository<Participation>
  ) {}

  async create({ meetingId, userId }: CreateParticipation) {
    const meeting = await this.meetingsService.findOne({ id: meetingId });
    if (!meeting) {
      throw new NotFoundException(`Meeting #${meetingId} not found`);
    }

    const existing = await this.findOne({ meetingId, userId });
    if (existing) {
      return existing;
    }

    const participation = this.participationsRepository.create({ meetingId, userId });
    return this.participationsRepository.save(participation);
  }

  async find(entity: Partial<Participation>) {
    return this.participationsRepository.find(entity);
  }

  async findOne(entity: Partial<Participation>) {
    return this.participationsRepository.findOne(entity);
  }

  async remove(id: string) {
    const result = await this.participationsRepository.delete(id);
    return result.affected === 1;
  }
}
