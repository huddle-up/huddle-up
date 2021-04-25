import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOperator, Like, Repository, MoreThan, FindOneOptions, FindManyOptions } from 'typeorm';
import { SearchMeetingInput } from './dto/search-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { Meeting } from './entities/meeting.entity';
import { CreateMeeting } from './interfaces/create-meeting.interface';

@Injectable()
export class MeetingsService {
  constructor(@InjectRepository(Meeting) private readonly meetingRepository: Repository<Meeting>) {}

  async create(createMeeting: CreateMeeting) {
    const meeting = this.meetingRepository.create(createMeeting);
    return this.meetingRepository.save(meeting);
  }

  async findAll() {
    return this.meetingRepository.find();
  }

  async find(entity: Partial<Meeting>) {
    return this.meetingRepository.find(entity);
  }

  async findOne(entity: Partial<Meeting>) {
    return this.meetingRepository.findOne(entity);
  }

  async search(searchMeetingInput: SearchMeetingInput, hostId?: string) {
    const searchValue: FindOperator<string> = Like(`%${searchMeetingInput.value}%`);
    const moreThanCurrentDate: FindOperator<Date> = MoreThan(new Date());
    const where: FindOneOptions['where'] = hostId
      ? [
          { hostId, title: searchValue },
          { hostId, description: searchValue },
        ]
      : [
          { title: searchValue, endDate: moreThanCurrentDate },
          { description: searchValue, endDate: moreThanCurrentDate },
        ];

    // TODO implement order parameter
    const order: FindOneOptions['order'] = {
      startDate: 'ASC',
    };

    // TODO implement pagination parameter (skip: offset, take: limit)
    const skip: FindManyOptions['skip'] = 0;
    const take: FindManyOptions['take'] = 100;

    const searchOptions: FindManyOptions = { where, order, skip, take };

    return this.meetingRepository.find(searchOptions);
  }

  async update(updateMeetingInput: UpdateMeetingInput) {
    return this.meetingRepository.save(updateMeetingInput);
  }

  async remove(id: string) {
    const result: DeleteResult = await this.meetingRepository.delete(id);
    return result.affected === 1;
  }
}
