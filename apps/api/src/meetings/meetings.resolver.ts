import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeetingsService } from './meetings.service';
import { Meeting } from './entities/meeting.entity';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { JwtGqlAuthGuard } from '../auth/jwt/jwt-gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Meeting)
@UseGuards(JwtGqlAuthGuard)
export class MeetingsResolver {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Mutation(() => Meeting)
  async createMeeting(@Args('createMeetingInput') createMeetingInput: CreateMeetingInput, @CurrentUser() authUser) {
    const meeting = { ...createMeetingInput, hostId: authUser.userId };
    return this.meetingsService.create(meeting);
  }

  @Query(() => [Meeting], { name: 'meetings' })
  async findAll() {
    return this.meetingsService.findAll();
  }

  @Query(() => [Meeting], { name: 'myMeetings' })
  async findMyMeetings(@CurrentUser() authUser) {
    const meetings = await this.meetingsService.find({ hostId: authUser.userId });
    return meetings;
  }

  @Query(() => Meeting, { name: 'meeting' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.meetingsService.findOne({ id });
  }

  @Mutation(() => Meeting)
  async updateMeeting(@Args('updateMeetingInput') updateMeetingInput: UpdateMeetingInput) {
    return this.meetingsService.update(updateMeetingInput);
  }

  @Mutation(() => Boolean)
  async removeMeeting(@Args('id', { type: () => String }) id: string) {
    return this.meetingsService.remove(id);
  }
}
