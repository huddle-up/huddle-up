import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JitsiService } from '../jitsi/jitsi.service';
import { User } from '../users/entities/user.entity';
import { Conference } from './entities/conference.entity';
import { CreateConference } from './interfaces/create-conference.interface';

@Injectable()
export class ConferencesService {
  constructor(
    private jitsiService: JitsiService,
    @InjectRepository(Conference) private readonly conferenceRepository: Repository<Conference>
  ) {}

  async findOne(entity: Partial<Conference>) {
    return this.conferenceRepository.findOne(entity);
  }

  async create({ meeting }: CreateConference) {
    let conference = await this.conferenceRepository.findOne({ id: meeting.id });
    if (!conference) {
      const obj = this.conferenceRepository.create({ meetingId: meeting.id });
      conference = await this.conferenceRepository.save(obj);
    }
    conference.providerProps = await this.jitsiService.create(conference);
    return this.conferenceRepository.save(conference);
  }

  async update(conference: Conference) {
    const existing = await this.conferenceRepository.findOne({ id: conference.id });
    if (!existing) {
      throw new NotFoundException(`The conference with id ${conference.id} does not exist.`);
    }
    return this.conferenceRepository.save(conference);
  }

  async publish(conf: Conference) {
    const conference = conf;
    if (!conference.publishedAt) {
      conference.publishedAt = new Date();
    }
    conference.providerProps = await this.jitsiService.publish(conference);
    return this.conferenceRepository.save(conference);
  }

  async stop(conf: Conference) {
    const conference = conf;
    if (!conference.stoppedAt) {
      conference.stoppedAt = new Date();
    }
    conference.providerProps = await this.jitsiService.stop(conference);
    return this.conferenceRepository.save(conference);
  }

  async getAccessLink(user: User, conference: Conference) {
    return this.jitsiService.getAccessLink(user, conference);
  }
}
