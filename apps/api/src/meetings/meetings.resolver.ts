import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeetingsService } from './meetings.service';
import { Meeting } from './entities/meeting.entity';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';

@Resolver(() => Meeting)
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
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.meetingsService.findOne(id);
  }

  @Mutation(() => Meeting)
  updateMeeting(@Args('updateMeetingInput') updateMeetingInput: UpdateMeetingInput) {
    return this.meetingsService.update(updateMeetingInput.id, updateMeetingInput);
  }

  @Mutation(() => Meeting)
  removeMeeting(@Args('id', { type: () => Int }) id: number) {
    return this.meetingsService.remove(id);
  }
}
