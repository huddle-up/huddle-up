import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOperator, Like, Repository, MoreThan, FindOneOptions, Between, LessThan } from 'typeorm';
import { Meeting } from './entities/meeting.entity';
import { CreateMeeting } from './interfaces/create-meeting.interface';
import { SearchCriteria } from './interfaces/search-criteria.interface';

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

  async update(updateMeetingInput: Partial<Meeting>) {
    return this.meetingRepository.save(updateMeetingInput);
  }

  async remove(id: string) {
    const result: DeleteResult = await this.meetingRepository.delete(id);
    return result.affected === 1;
  }
}
