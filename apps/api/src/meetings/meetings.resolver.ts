import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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
  async createMeeting(@Args('input') input: CreateMeetingInput, @CurrentUser() authUser) {
    const meeting = { ...input, hostId: authUser.userId };
    return this.meetingsService.create(meeting);
  }

  @Query(() => MeetingSearchResponse, { name: 'discover' })
  async findAll(@Args('input') searchCriteria: SearchCriteriaInput) {
    return this.meetingsService.search(searchCriteria);
  }

  @Query(() => MeetingSearchResponse, { name: 'myMeetings' })
  async findMyMeetings(@CurrentUser() authUser, @Args('searchMeetingInput') searchCriteria: SearchCriteriaInput) {
    return this.meetingsService.search(searchCriteria, authUser.userId);
  }

  @Query(() => Meeting, { name: 'meeting' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.meetingsService.findOne({ id });
  }

  @Mutation(() => Meeting)
  async updateMeeting(@Args('input') input: UpdateMeetingInput) {
    return this.meetingsService.update(input);
  }

  @Mutation(() => Boolean)
  async removeMeeting(@Args('id', { type: () => String }) id: string) {
    return this.meetingsService.remove(id);
  }
}
