import { OrderBy } from '../enums/OrderBy.enum';

export interface SearchCriteria {
  searchValue: string;
  startDateOrderBy: OrderBy;
  fromDate?: Date;
  toDate?: Date;
  offset?: number;
  limit?: number;
}
