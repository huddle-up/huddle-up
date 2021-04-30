import { isWithinInterval, isFuture, isPast } from 'date-fns';
import { Meeting_meeting as Meeting } from '../models/meetings/__generated-interfaces__/Meeting';

export function isWithinIntervalFilter(meetings: Meeting[]): Meeting[] {
  const currentDate = new Date();
  return meetings.filter((m) =>
    isWithinInterval(currentDate, { start: new Date(m.startDate), end: new Date(m.endDate) })
  );
}

export function isInFutureFilter(meetings: Meeting[]): Meeting[] {
  return meetings.filter((m) => isFuture(new Date(m.startDate)));
}

export function isInPastFilter(meetings: Meeting[]): Meeting[] {
  return meetings.filter((m) => isPast(new Date(m.endDate)));
}
