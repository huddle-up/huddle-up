import { Injectable } from '@nestjs/common';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';

@Injectable()
export class MeetingsService {
  private meetings = [
    {
      id: 1,
      title: 'Hundetreffen',
      description: 'Ein Treffen für Hundefreunde.',
      startDate: new Date(2021, 10, 17),
      endDate: new Date(2021, 11, 17),
    },
    {
      id: 2,
      title: 'Katzentreffen',
      description: 'Ein Treffen für Katzenfreunde.',
      startDate: new Date(2021, 11, 15),
      endDate: new Date(2021, 12, 15),
    },
  ];

  create(createMeetingInput: CreateMeetingInput) {
    const newMeeting = {
      ...createMeetingInput,
      description: createMeetingInput.description || '',
      id: this.meetings.length + 1,
    };
    this.meetings.push(newMeeting);
    return newMeeting;
  }

  findAll() {
    return this.meetings;
  }

  findOne(id: number) {
    return this.meetings[1];
  }

  update(id: number, updateMeetingInput: UpdateMeetingInput) {
    return updateMeetingInput;
  }

  remove(id: number) {
    return true;
  }
}
