import { OrderBy } from 'meetings/enums/OrderBy.enum';

export interface SearchCriteria {
  searchValue: string;
  startDateOrderBy: OrderBy;
  fromDate: Date;
  toDate: Date;
}
