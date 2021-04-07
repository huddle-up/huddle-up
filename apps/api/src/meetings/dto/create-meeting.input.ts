import { InputType, Int, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateMeetingInput {
  @Field(() => String, { description: 'The title of the meeting' })
  @MinLength(5)
  title: string;

  @Field({ nullable: true, description: 'The description of the meeting' })
  description?: string;

  @Field(() => Date, { description: 'The start date of the meeting' })
  startDate: Date;

  @Field(() => Date, { description: 'The end date of the meeting' })
  endDate: Date;
}
