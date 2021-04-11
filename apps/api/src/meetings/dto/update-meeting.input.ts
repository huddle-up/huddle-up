import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateMeetingInput } from './create-meeting.input';

@InputType()
export class UpdateMeetingInput extends PartialType(CreateMeetingInput) {
  @Field(() => Int, { description: 'The id of the meeting' })
  id: number;
}
