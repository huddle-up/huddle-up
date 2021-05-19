import { isWithinInterval, isFuture, isPast, parseISO } from 'date-fns';
import { Meeting_meeting as Meeting } from '../models/meetings/__generated-interfaces__/Meeting';
import { UserFields } from '../models/user/__generated-interfaces__/UserFields';

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

export function isHostOrParticipant(user: UserFields, meetings: Meeting[]): Meeting[] {
  return user ? meetings.filter((meeting) => isHost(user, meeting) || isParticipant(user, meeting)) : [];
}

export function isHost(user: UserFields, meeting: Meeting): boolean {
  return meeting && user ? meeting.host?.id === user.id : false;
}

export function isParticipant(user: UserFields, meeting: Meeting): boolean {
  return meeting && user ? meeting.participations?.some((p) => p.user?.id === user.id) : false;
}
