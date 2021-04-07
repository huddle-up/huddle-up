import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Meeting {
  @Field(() => Int, { description: 'The id of the meeting' })
  id: number;

  @Field(() => String, { description: 'The title of the meeting' })
  title: string;

  @Field({ nullable: true, description: 'The description of the meeting' })
  description?: string;

  @Field(() => Date, { description: 'The start date of the meeting' })
  startDate: Date;

  @Field(() => Date, { description: 'The end date of the meeting' })
  endDate: Date;
}
