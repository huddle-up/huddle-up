import { InputType, Field, Int } from '@nestjs/graphql';
import { TagOption } from './tag-option.input';
// import { MinLength } from 'class-validator';

@InputType()
export class CreateMeetingInput {
  @Field({ description: 'The title of the meeting' })
  // @MinLength(5)
  title: string;

  @Field({ nullable: true, description: 'The optional description of the meeting' })
  description?: string;

  @Field(() => Date, { description: 'The start date of the meeting' })
  startDate: Date;

  @Field(() => Date, { description: 'The end date of the meeting' })
  endDate: Date;

  @Field(() => [TagOption], { description: 'The tags of the meeting' })
  tags: TagOption[];

  @Field(() => Int, { nullable: true, description: 'The maximum allowed participants of the meeting' })
  maximumParticipants?: number;
}
