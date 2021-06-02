/* eslint no-param-reassign: ["error", { "props": false }] */
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Conference } from './entities/conference.entity';
import { ConferenceProvider, CONFERENCE_PROVIDER } from './interfaces/conference-provider.interface';
import { CreateConference } from './interfaces/create-conference.interface';

@Injectable()
export class ConferencesService {
  constructor(
    @Inject(CONFERENCE_PROVIDER) private conferenceProvider: ConferenceProvider,
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
    conference.providerProps = await this.conferenceProvider.create(conference);
    return this.conferenceRepository.save(conference);
  }

  async publish(conference: Conference) {
    if (!conference.publishedAt) {
      conference.publishedAt = new Date();
    }
    conference.providerProps = await this.conferenceProvider.publish(conference);
    return this.conferenceRepository.save(conference);
  }

  async stop(conference: Conference) {
    if (!conference.stoppedAt) {
      conference.stoppedAt = new Date();
    }
    conference.providerProps = await this.conferenceProvider.stop(conference);
    return this.conferenceRepository.save(conference);
  }

  async getAccessLink(user: User, conference: Conference) {
    return this.conferenceProvider.getAccessLink(user, conference);
  }
}
