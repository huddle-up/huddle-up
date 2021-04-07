import { Injectable } from '@nestjs/common';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';

@Injectable()
export class MeetingsService {
  create(createMeetingInput: CreateMeetingInput) {
    return { ...createMeetingInput, id: 55 };
  }

  findAll() {
    return [
      { id: 1, title: 'test 1', description: 'description test1', startDate: new Date(), endDate: new Date() },
      { id: 2, title: 'test 2', description: 'description test2', startDate: new Date(), endDate: new Date() },
    ];
  }

  findOne(id: number) {
    return { id: 1, title: 'test 1', description: 'description test1', startDate: new Date(), endDate: new Date() };
  }

  update(id: number, updateMeetingInput: UpdateMeetingInput) {
    return updateMeetingInput;
  }

  remove(id: number) {
    return true;
  }
}
