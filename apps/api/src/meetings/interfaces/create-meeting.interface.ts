import { Tag } from '../../tags/entities/tag.entity';

export interface CreateMeeting {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  hostId: string;
  tags: Partial<Tag>[];
  maximumParticipants?: number;
}
