import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchMeetingInput {
  @Field({ description: 'The value to search for in meetings' })
  value: string;
}
