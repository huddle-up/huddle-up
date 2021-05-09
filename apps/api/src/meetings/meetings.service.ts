import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addMinutes } from 'date-fns';
import { DeleteResult, FindOperator, Like, Repository, MoreThan, FindOneOptions, Between, LessThan, In } from 'typeorm';
import { TagsService } from '../tags/tags.service';
import { MeetingsConfigService } from '../config/meetings/config.service';
import { Meeting } from './entities/meeting.entity';
import { CreateMeeting } from './interfaces/create-meeting.interface';
import { SearchCriteria } from './interfaces/search-criteria.interface';
import { UpdateMeeting } from './interfaces/update-meeting.inferface';

@Injectable()
export class MeetingsService {
  constructor(
    private readonly meetingsConfigService: MeetingsConfigService,
    private readonly tagService: TagsService,
    @InjectRepository(Meeting) private readonly meetingRepository: Repository<Meeting>
  ) {}

  async create(createMeeting: CreateMeeting) {
    const { tags, ...partialMeeting } = createMeeting;
    const meeting = this.meetingRepository.create(partialMeeting);

    if (tags) {
      const newTags = await this.tagService.findOrCreate(tags);
      meeting.tags = Promise.resolve(newTags);
    }
    console.log('create', meeting);
    meeting.prepareDate = this.addPreparationTime(meeting.startDate);
    return this.meetingRepository.save(meeting);
  }

  async findAll() {
    return this.meetingRepository.find();
  }

  async find(entity: Partial<Meeting>) {
    return this.meetingRepository.find(entity);
  }

  findOne(entity: Partial<Meeting>) {
    return this.meetingRepository.findOne(entity, { relations: ['tags'] });
  }

  async search(searchCriteria: SearchCriteria, hostId?: string) {
    const { startDateOrderBy, offset, limit } = searchCriteria;

    const where = this.getWhereOptions(searchCriteria, hostId);

    const order: FindOneOptions['order'] = {
      startDate: startDateOrderBy,
    };

    const pagination = offset >= 0 && limit > 0 && { skip: offset, take: limit };

    const [meetings, totalCount] = await this.meetingRepository.findAndCount({
      relations: ['tags'],
      where,
      order,
      ...pagination,
    });
    return { meetings, totalCount };
  }

  private getWhereOptions(searchCriteria: SearchCriteria, hostId: string): FindOneOptions['where'] {
    const { searchValue, tags } = searchCriteria;
    const valueOperator: FindOperator<string> = Like(`%${searchValue}%`);
    const baseOptions = hostId ? { hostId } : { endDate: MoreThan(new Date()) };
    const dateOperator = this.getDateFilterOperator(searchCriteria);
    const dateOptions = dateOperator && { startDate: dateOperator };
    const tagsOptions = tags?.length > 0 && { tags: { id: In(tags.map((tag) => tag.id)) } };

    return [
      { title: valueOperator, ...baseOptions, ...dateOptions, ...tagsOptions },
      { description: valueOperator, ...baseOptions, ...dateOptions, ...tagsOptions },
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

  async update(updateMeeting: UpdateMeeting) {
    const { tags, ...partialMeeting } = updateMeeting;
    const existingMeeting = await this.meetingRepository.findOne({ id: partialMeeting.id });
    if (!existingMeeting) {
      throw new NotFoundException(`Meeting with id ${partialMeeting.id} does not exist`);
    }
    const meeting: Meeting = { ...existingMeeting, ...partialMeeting };

    if (tags) {
      const newTags = await this.tagService.findOrCreate(tags);
      meeting.tags = Promise.resolve(newTags); // TODO update does not work with promises
    }

    meeting.prepareDate = this.addPreparationTime(meeting.startDate);
    const { id } = await this.meetingRepository.save(meeting);
    return this.meetingRepository.findOne({ id });
  }

  private addPreparationTime(startDate: Date) {
    return addMinutes(startDate, -1 * this.meetingsConfigService.preparationTime);
  }

  async remove(id: string) {
    const result: DeleteResult = await this.meetingRepository.delete(id);
    return result.affected === 1;
  }
}
