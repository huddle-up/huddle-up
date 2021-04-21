export interface CreateMeeting {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  hostId: string;
}
