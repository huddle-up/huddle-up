import { Tag } from '../../tags/entities/tag.entity';

export interface UpdateMeeting {
  id: string;
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  hostId?: string;
  tags?: Partial<Tag>[];
}
