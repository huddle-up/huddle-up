import { BadRequestException, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { isPast } from 'date-fns';
import { MeetingsService } from './meetings.service';
import { Meeting } from './entities/meeting.entity';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { JwtGqlAuthGuard } from '../auth/jwt/jwt-gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SearchCriteriaInput } from './dto/search-criteria.input';
import { MeetingSearchResponse } from './dto/meeting-search-response.dto';

@Resolver(() => Meeting)
@UseGuards(JwtGqlAuthGuard)
export class MeetingsResolver {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Mutation(() => Meeting)
  async createMeeting(@Args('input') input: CreateMeetingInput, @CurrentUser() { userId }) {
    const meeting = { ...input, hostId: userId };
    return this.meetingsService.create(meeting);
  }

  @Query(() => MeetingSearchResponse, { name: 'discover' })
  async findAll(@Args('input') searchCriteria: SearchCriteriaInput) {
    return this.meetingsService.search({ filterOutStopped: true, ...searchCriteria });
  }

  @Query(() => MeetingSearchResponse, { name: 'myMeetings' })
  async findMyMeetings(@Args('searchMeetingInput') searchCriteria: SearchCriteriaInput, @CurrentUser() { userId }) {
    return this.meetingsService.search(searchCriteria, userId);
  }

  @Query(() => Meeting, { name: 'meeting' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.meetingsService.findOne({ id });
  }

  @Mutation(() => Meeting)
  async updateMeeting(@Args('input') input: UpdateMeetingInput, @CurrentUser() { userId }) {
    const meeting = await this.meetingsService.findOne({ id: input.id });
    if (meeting && meeting.hostId !== userId) {
      throw new UnauthorizedException();
    }
    if (!meeting) {
      throw new NotFoundException(`Meeting #${input.id} not found`);
    }
    const conference = await meeting.conference;
    if (conference) {
      throw new UnauthorizedException('You cannot edit a meeting once it has been started.');
    }
    return this.meetingsService.update(input);
  }

  @Mutation(() => Meeting)
  async cancelMeeting(@Args('id', { type: () => String }) id: string, @CurrentUser() { userId }) {
    const meeting = await this.meetingsService.findOne({ id });
    if (!meeting) {
      throw new NotFoundException(`Meeting #${id} not found`);
    }
    if (meeting.hostId !== userId) {
      throw new UnauthorizedException();
    }
    const conference = await meeting.conference;
    if (conference || isPast(meeting.startDate)) {
      throw new BadRequestException('Cannot cancel a started meeting');
    }
    if (meeting.canceledOn) {
      return meeting;
    }
    return this.meetingsService.cancel(meeting);
  }
}
