import { NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtGqlAuthGuard } from '../auth/jwt/jwt-gql-auth.guard';
import { MeetingsService } from '../meetings/meetings.service';
import { ConferencesService } from './conferences.service';
import { CreateConferenceInput } from './dto/create-conference-input';
import { Conference } from './entities/conference.entity';

@Resolver(() => Conference)
@UseGuards(JwtGqlAuthGuard)
export class ConferenceResolver {
  constructor(
    private readonly conferencesService: ConferencesService,
    private readonly meetingsService: MeetingsService
  ) {}

  @Mutation(() => Conference)
  async createConference(@Args('input') input: CreateConferenceInput, @CurrentUser() { userId }) {
    const { meetingId } = input;
    const meeting = await this.meetingsService.findOne({ id: meetingId });
    if (!meeting) {
      throw new NotFoundException(`Meeting with id ${meetingId} does not exist.`);
    }
    if (meeting.hostId !== userId) {
      throw new UnauthorizedException();
    }
    const conference = await this.conferencesService.create({ meeting });
    return conference;
  }

  @Mutation(() => Conference)
  async publishConference(@Args('conferenceId') conferenceId: string, @CurrentUser() { userId }) {
    const conference = await this.conferencesService.findOne({ id: conferenceId });
    if (!conference) {
      throw new NotFoundException(`Conference with id ${conferenceId} does not exist.`);
    }
    const meeting = await conference.meeting;
    if (meeting.hostId !== userId) {
      throw new UnauthorizedException();
    }
    return this.conferencesService.publish(conference);
  }

  @Mutation(() => Conference)
  async stopConference(@Args('conferenceId') conferenceId: string, @CurrentUser() { userId }) {
    const conference = await this.conferencesService.findOne({ id: conferenceId });
    if (!conference) {
      throw new NotFoundException(`Conference with id ${conferenceId} does not exist.`);
    }
    const meeting = await conference.meeting;
    if (meeting.hostId !== userId) {
      throw new UnauthorizedException();
    }
    return this.conferencesService.stop(conference);
  }

  @Query(() => Conference, { name: 'conference' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.conferencesService.findOne({ id });
  }

  @Query(() => Conference, { name: 'conferenceByMeeting', nullable: true })
  async findByMeeting(@Args('meetingId', { type: () => String }) meetingId: string) {
    return this.conferencesService.findOne({ meetingId });
  }
}
