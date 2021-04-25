import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateConferenceInput {
  @Field({ description: 'The id of the meeting to create a conference for.' })
  meetingId: string;
}
