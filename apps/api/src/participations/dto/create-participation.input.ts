import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateParticipationInput {
  @Field({ description: 'The id of the meeting the participation should belong to' })
  meetingId: string;

  @Field({
    description: 'The id of the user the participation should belong to (optional, defaults to the current user)',
    nullable: true,
  })
  userId?: string;
}
