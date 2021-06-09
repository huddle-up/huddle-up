import { isWithinInterval, isFuture, isPast, parseISO } from 'date-fns';
import { Meeting_meeting as Meeting } from '../models/meetings/__generated-interfaces__/Meeting';

export function isUndefined(x: any) {
  return x === undefined;
}

export function isWithinIntervalFilter(meetings: Meeting[]): Meeting[] {
  const currentDate = new Date();
  return meetings.filter((meeting) =>
    isWithinInterval(currentDate, { start: parseISO(meeting.startDate), end: parseISO(meeting.endDate) })
  );
}

export function isInFutureFilter(meetings: Meeting[]): Meeting[] {
  return meetings.filter((meeting) => isFuture(parseISO(meeting.startDate)));
}

export function isInPastFilter(meetings: Meeting[]): Meeting[] {
  return meetings.filter((meeting) => isPast(parseISO(meeting.endDate)));
}
