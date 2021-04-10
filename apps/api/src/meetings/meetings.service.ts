import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class MeetingsService {
  constructor(@InjectRepository(Meeting) private readonly meetingRepository: Repository<Meeting>) {}

  create(createMeetingInput: CreateMeetingInput) {
    return this.meetingRepository.save(createMeetingInput);
  }

  findAll() {
    return this.meetingRepository.find();
  }

  findOne(id: number) {
    return this.meetingRepository.findOne(id);
  }

  update(id: number, updateMeetingInput: UpdateMeetingInput) {
    return id && this.meetingRepository.save(updateMeetingInput);
  }

  async remove(id: number) {
    const result: DeleteResult = await this.meetingRepository.delete(id);
    return result.affected === 1;
  }
}
