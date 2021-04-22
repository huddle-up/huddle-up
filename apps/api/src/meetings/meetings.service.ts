import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOperator, Like, Repository } from 'typeorm';
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
    const searchCondition = hostId
      ? {
          where: [
            { hostId, title: searchValue },
            { hostId, description: searchValue },
          ],
        }
      : {
          where: [{ title: searchValue }, { description: searchValue }],
        };
    return this.meetingRepository.find(searchCondition);
  }

  async update(updateMeetingInput: UpdateMeetingInput) {
    return this.meetingRepository.save(updateMeetingInput);
  }

  async remove(id: string) {
    const result: DeleteResult = await this.meetingRepository.delete(id);
    return result.affected === 1;
  }
}
