import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateMeetingInput } from './create-meeting.input';

@InputType()
export class UpdateMeetingInput extends PartialType(CreateMeetingInput) {
  @Field({ description: 'The id of the meeting' })
  id: string;
}
