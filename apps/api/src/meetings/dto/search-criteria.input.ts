import { InputType, Field } from '@nestjs/graphql';
import { OrderBy } from 'meetings/enums/OrderBy.enum';

@InputType()
export class SearchCriteriaInput {
  @Field({ description: 'The value to search for in meetings' })
  searchValue: string;

  @Field(() => OrderBy, { description: 'The start date order by direction for in meetings' })
  startDateOrderBy: OrderBy;

  @Field(() => Date, { nullable: true, description: 'The from date to filter meetings' })
  fromDate: Date;

  @Field(() => Date, { nullable: true, description: 'The to date to filter meetings' })
  toDate: Date;
}
