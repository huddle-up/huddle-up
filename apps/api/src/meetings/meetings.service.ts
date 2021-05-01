import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addMinutes } from 'date-fns';
import { DeleteResult, FindOperator, Like, Repository, MoreThan, FindOneOptions, Between, LessThan } from 'typeorm';
import { MeetingsConfigService } from '../config/meetings/config.service';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { Meeting } from './entities/meeting.entity';
import { CreateMeeting } from './interfaces/create-meeting.interface';
import { SearchCriteria } from './interfaces/search-criteria.interface';

@Injectable()
export class MeetingsService {
  constructor(
    private readonly meetingsConfigService: MeetingsConfigService,
    @InjectRepository(Meeting) private readonly meetingRepository: Repository<Meeting>
  ) {}

  async create(createMeeting: CreateMeeting) {
    const meeting = this.meetingRepository.create(createMeeting);
    meeting.prepareDate = addMinutes(meeting.startDate, -1 * this.meetingsConfigService.preparationTime);
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

  async search(searchCriteria: SearchCriteria, hostId?: string) {
    const { startDateOrderBy, offset, limit } = searchCriteria;

    const where = this.getWhereOptions(searchCriteria, hostId);

    const order: FindOneOptions['order'] = {
      startDate: startDateOrderBy,
    };

    const pagination = offset >= 0 && limit > 0 && { skip: offset, take: limit };

    const [meetings, totalCount] = await this.meetingRepository.findAndCount({ where, order, ...pagination });
    return { meetings, totalCount };
  }

  private getWhereOptions(searchCriteria: SearchCriteria, hostId: string): FindOneOptions['where'] {
    const { searchValue } = searchCriteria;
    const valueOperator: FindOperator<string> = Like(`%${searchValue}%`);
    const baseOptions = hostId ? { hostId } : { endDate: MoreThan(new Date()) };
    const dateOperator = this.getDateFilterOperator(searchCriteria);
    const dateOptions = dateOperator && { startDate: dateOperator };
    return [
      { title: valueOperator, ...baseOptions, ...dateOptions },
      { description: valueOperator, ...baseOptions, ...dateOptions },
    ];
  }

  private getDateFilterOperator({ fromDate, toDate }: SearchCriteria): FindOperator<Date> {
    if (fromDate) {
      if (toDate) {
        return Between(fromDate, toDate);
      }
      return MoreThan(fromDate);
    }
    if (toDate) {
      return LessThan(toDate);
    }
    return undefined;
  }

  async update(updateMeetingInput: UpdateMeetingInput) {
    const meeting = await this.meetingRepository.findOne({ id: updateMeetingInput.id });
    if (!meeting) {
      throw new NotFoundException(`Meeting with id ${updateMeetingInput.id} does not exist`);
    }
    const updatedMeeting: Meeting = { ...meeting, ...updateMeetingInput };
    return this.meetingRepository.save({
      ...updatedMeeting,
      prepareDate: addMinutes(updatedMeeting.startDate, -1 * this.meetingsConfigService.preparationTime),
    });
  }

  async remove(id: string) {
    const result: DeleteResult = await this.meetingRepository.delete(id);
    return result.affected === 1;
  }
}
