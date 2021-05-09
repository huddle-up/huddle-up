import { InputType, Field, Int } from '@nestjs/graphql';
import { OrderBy } from '../enums/OrderBy.enum';
import { TagOption } from './tag-option.input';

@InputType()
export class SearchCriteriaInput {
  @Field({ description: 'The value to search for in meetings' })
  searchValue: string;

  @Field(() => OrderBy, { description: 'The start date order by direction for in meetings' })
  startDateOrderBy: OrderBy;

  @Field(() => Date, { nullable: true, description: 'The optional from date to filter meetings' })
  fromDate: Date;

  @Field(() => Date, { nullable: true, description: 'The optional to date to filter meetings' })
  toDate?: Date;

  @Field(() => [TagOption], { nullable: true, description: 'The optional tags filter meetings' })
  tags?: TagOption[];

  @Field(() => Int, {
    nullable: true,
    description: 'The optional pagination offset, needs limit field to work.',
  })
  offset: number;

  @Field(() => Int, {
    nullable: true,
    description: 'The optional pagination limit, needs offset field to work.',
  })
  limit: number;
}
