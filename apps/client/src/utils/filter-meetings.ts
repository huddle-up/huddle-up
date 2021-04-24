import { isWithinInterval, isFuture, isPast } from 'date-fns';
import { Meetings_meetings } from '../models/meetings/__generated-interfaces__/Meetings';

export function isWithinIntervalFilter(meetings: Meetings_meetings[]): Meetings_meetings[] {
  const currentDate = new Date();
  return meetings.filter((m) =>
    isWithinInterval(currentDate, { start: new Date(m.startDate), end: new Date(m.endDate) })
  );
}

export function isInFutureFilter(meetings: Meetings_meetings[]): Meetings_meetings[] {
  return meetings.filter((m) => isFuture(new Date(m.startDate)));
}

export function isInPastFilter(meetings: Meetings_meetings[]): Meetings_meetings[] {
  return meetings.filter((m) => isPast(new Date(m.endDate)));
}
