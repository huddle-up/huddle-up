import { InputType, Field } from '@nestjs/graphql';
import { OrderBy } from 'meetings/enums/OrderBy.enum';

@InputType()
export class SearchMeetingInput {
  @Field({ description: 'The value to search for in meetings' })
  searchValue: string;

  @Field(() => OrderBy, { description: 'The start date order by direction for in meetings' })
  startDateOrderBy: OrderBy;
}
