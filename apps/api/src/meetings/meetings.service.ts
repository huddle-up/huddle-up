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

  findOne(entity: Partial<Meeting>) {
    return this.meetingRepository.findOne(entity);
  }

  update(updateMeetingInput: UpdateMeetingInput) {
    return this.meetingRepository.save(updateMeetingInput);
  }

  async remove(id: string) {
    const result: DeleteResult = await this.meetingRepository.delete(id);
    return result.affected === 1;
  }
}
