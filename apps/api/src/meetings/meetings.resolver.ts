import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeetingsService } from './meetings.service';
import { Meeting } from './entities/meeting.entity';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { JwtGqlAuthGuard } from '../auth/jwt/jwt-gql-auth.guard';

@Resolver(() => Meeting)
@UseGuards(JwtGqlAuthGuard)
export class MeetingsResolver {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Mutation(() => Meeting)
  createMeeting(@Args('createMeetingInput') createMeetingInput: CreateMeetingInput) {
    return this.meetingsService.create(createMeetingInput);
  }

  @Query(() => [Meeting], { name: 'meetings' })
  findAll() {
    return this.meetingsService.findAll();
  }

  @Query(() => Meeting, { name: 'meeting' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.meetingsService.findOne({ id });
  }

  @Mutation(() => Meeting)
  updateMeeting(@Args('updateMeetingInput') updateMeetingInput: UpdateMeetingInput) {
    return this.meetingsService.update(updateMeetingInput);
  }

  @Mutation(() => Boolean)
  removeMeeting(@Args('id', { type: () => String }) id: string) {
    return this.meetingsService.remove(id);
  }
}
