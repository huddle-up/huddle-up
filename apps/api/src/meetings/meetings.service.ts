import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addMinutes } from 'date-fns';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { flow } from 'lodash';
import { TagsService } from '../tags/tags.service';
import { MeetingsConfigService } from '../config/meetings/config.service';
import { Meeting } from './entities/meeting.entity';
import { CreateMeeting } from './interfaces/create-meeting.interface';
import { SearchCriteria } from './interfaces/search-criteria.interface';
import { UpdateMeeting } from './interfaces/update-meeting.inferface';
import { Tag } from '../tags/entities/tag.entity';
import { CompletionState } from './enums/completion-state.enum';

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

    meeting.prepareDate = this.addPreparationTime(meeting.startDate);

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

  async search(searchCriteria: SearchCriteria, userId?: string) {
    const { searchValue, startDateOrderBy, offset, limit, fromDate, toDate, tags, completionState } = searchCriteria;
    // This will append the query builder options to the base query in the specified order
    const query = flow(
      (q) => this.applySearchFilter(q, searchValue),
      (q) => this.applyHostOrParticipantFilter(q, userId),
      (q) => this.applyTagFilter(q, tags),
      (q) => this.applyCompletionFilter(q, completionState),
      (q) => this.applyStartDateFilter(q, fromDate, toDate)
    )(this.meetingRepository.createQueryBuilder('meeting'));

    const [meetings, totalCount] = await query
      .orderBy('meeting.startDate', startDateOrderBy)
      .limit(limit)
      .offset(offset)
      .getManyAndCount();
    return { meetings, totalCount };
  }

  private applySearchFilter(query: SelectQueryBuilder<Meeting>, search: string): SelectQueryBuilder<Meeting> {
    if (search) {
      return query.andWhere('(meeting.title ILIKE :search OR meeting.description ILIKE :search)', {
        search: `%${search}%`,
      });
    }
    return query;
  }

  private applyHostOrParticipantFilter(
    query: SelectQueryBuilder<Meeting>,
    userId: string
  ): SelectQueryBuilder<Meeting> {
    if (userId) {
      return query.andWhere(
        (queryBuilder) => {
          const subQuery = queryBuilder
            .subQuery()
            .select('1')
            .from('participation', 'participation')
            .where('participation.meetingId = meeting.id')
            .andWhere('participation.userId = :userId', { userId })
            .getQuery();
          return `(meeting.hostId = :userId OR EXISTS(${subQuery}))`;
        },
        { userId }
      );
    }
    return query;
  }

  private applyStartDateFilter(
    query: SelectQueryBuilder<Meeting>,
    fromDate: Date,
    toDate: Date
  ): SelectQueryBuilder<Meeting> {
    if (fromDate) {
      if (toDate) {
        return query.andWhere('meeting.startDate BETWEEN :fromDate AND :toDate', { fromDate, toDate });
      }
      return query.andWhere('meeting.startDate > :fromDate', { fromDate });
    }
    if (toDate) {
      return query.andWhere('meeting.startDate < :toDate', { toDate });
    }
    return query;
  }

  private applyCompletionFilter(query: SelectQueryBuilder<Meeting>, state?: CompletionState) {
    if (state === CompletionState.CompletedOrPast) {
      return query.andWhere((queryBuilder) => {
        const subQuery = queryBuilder
          .subQuery()
          .select('1')
          .from('conference', 'conference')
          .where('conference.stoppedAt IS NOT NULL')
          .andWhere('conference.meetingId = meeting.id')
          .getQuery();
        return `(EXISTS ${subQuery} OR meeting.endDate < NOW())`;
      });
    }
    if (state === CompletionState.OngoingOrFuture) {
      return query.andWhere((queryBuilder) => {
        const subQuery = queryBuilder
          .subQuery()
          .select('1')
          .from('conference', 'conference')
          .where('conference.stoppedAt IS NOT NULL')
          .andWhere('conference.meetingId = meeting.id')
          .getQuery();
        return `(NOT EXISTS ${subQuery} AND meeting.endDate > NOW())`;
      });
    }
    return query;
  }

  private applyTagFilter(query: SelectQueryBuilder<Meeting>, tags?: Partial<Tag>[]): SelectQueryBuilder<Meeting> {
    if (tags && tags.length > 0) {
      const tagIds = tags.map((t) => t.id);
      return query.innerJoin('meeting.tags', 'tag', 'tag.id IN (:...tagIds)', { tagIds });
    }
    return query;
  }

  async update(updateMeeting: UpdateMeeting) {
    const { tags, ...partialMeeting } = updateMeeting;
    const existingMeeting = await this.meetingRepository.findOne({ id: partialMeeting.id });
    if (!existingMeeting) {
      throw new NotFoundException(`Meeting #${updateMeeting.id} not found`);
    }

    const meeting: Meeting = this.meetingRepository.create({ ...existingMeeting, ...partialMeeting });

    if (tags) {
      const newTags = await this.tagService.findOrCreate(tags);
      meeting.tags = Promise.resolve(newTags);
    }

    meeting.prepareDate = this.addPreparationTime(meeting.startDate);

    const { id } = await this.meetingRepository.save(meeting);
    return this.findOne({ id });
  }

  async cancel(meeting: Meeting) {
    if (meeting.canceledOn) {
      return meeting;
    }
    const canceledMeeting = this.meetingRepository.create({ ...meeting, canceledOn: new Date() });
    return this.meetingRepository.save(canceledMeeting);
  }

  private addPreparationTime(startDate: Date) {
    return addMinutes(startDate, -1 * this.meetingsConfigService.preparationTime);
  }
}
