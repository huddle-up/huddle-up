import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Meeting } from 'meetings/entities/meeting.entity';

@ObjectType()
export class MeetingSearchResponse {
  @Field(() => [Meeting], { description: 'The found meetings' })
  meetings: Meeting[];

  @Field(() => Int, { description: 'The total number of meetings ignoring the pagination attributes' })
  totalCount: number;
}
