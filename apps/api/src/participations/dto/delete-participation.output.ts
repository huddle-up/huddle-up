import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteParticipationOutput {
  @Field({ description: 'The id of the deleted participation' })
  id: string;

  @Field({ description: 'The id of the meeting the participation belonged to' })
  meetingId: string;

  constructor(id: string, meetingId: string) {
    this.id = id;
    this.meetingId = meetingId;
  }
}
