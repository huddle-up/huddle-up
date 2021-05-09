import { OrderBy } from '../enums/OrderBy.enum';
import { Tag } from '../../tags/entities/tag.entity';

export interface SearchCriteria {
  searchValue: string;
  startDateOrderBy: OrderBy;
  tags?: Partial<Tag>[];
  fromDate?: Date;
  toDate?: Date;
  offset?: number;
  limit?: number;
}
