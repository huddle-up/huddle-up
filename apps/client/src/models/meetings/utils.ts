import { parseISO, isToday as isTodayFns, isBefore, isAfter } from 'date-fns';
import { UserFields } from '../user/__generated-interfaces__/UserFields';
import { MeetingFields } from './__generated-interfaces__/MeetingFields';

//
// Date
//
export function isToday(meeting: MeetingFields): boolean {
  return isTodayFns(parseISO(meeting.startDate));
}

export function isInPast(meeting: MeetingFields, currentDate?: Date): boolean {
  const compareDate = currentDate || new Date();
  return isBefore(parseISO(meeting.endDate), compareDate);
}

export function isInFuture(meeting: MeetingFields, currentDate?: Date): boolean {
  const compareDate = currentDate || new Date();
  return isAfter(parseISO(meeting.startDate), compareDate);
}

//
// User
//
export function isHost(user: UserFields, meeting: MeetingFields): boolean {
  return meeting && user ? meeting.host?.id === user.id : false;
}

export function isParticipant(user: UserFields, meeting: MeetingFields): boolean {
  return meeting && user ? meeting.participations?.some((p) => p.user?.id === user.id) : false;
}

//
// State
//
export function isCanceled(meeting: MeetingFields): boolean {
  return !!meeting.canceledOn;
}

export function isReadyToStart(meeting: MeetingFields, currentDate?: Date): boolean {
  const compareDate = currentDate || new Date();
  return isAfter(parseISO(meeting.prepareDate), compareDate) && !isInPast(meeting, compareDate);
}

export function isStarted(meeting: MeetingFields): boolean {
  return !!meeting.conference;
}

export function isPublished(meeting: MeetingFields): boolean {
  return meeting.conference && meeting.conference.publishedAt;
}

export function isStopped(meeting: MeetingFields): boolean {
  return meeting.conference && meeting.conference.stoppedAt;
}

export function isLive(meeting: MeetingFields, forUser?: UserFields, currentDate?: Date): boolean {
  const compareDate = currentDate || new Date();
  if (!meeting.conference) {
    return false;
  }

  const host = forUser && isHost(forUser, meeting);
  // If the conference is past its end date we will show it as stopped to non-hosts.
  if (!host && isInPast(meeting, compareDate)) {
    return false;
  }

  return isPublished(meeting) && !isStopped(meeting);
}

//
// Permissions
//
export function canBeStarted(meeting: MeetingFields, currentDate?: Date): boolean {
  const compareDate = currentDate || new Date();
  return !isStarted(meeting) && isReadyToStart(meeting, compareDate);
}

export function canBePublished(meeting: MeetingFields, currentDate?: Date): boolean {
  const compareDate = currentDate || new Date();
  return (
    isStarted(meeting) && !isPublished(meeting) && !isInFuture(meeting, compareDate) && !isInPast(meeting, compareDate)
  );
}

export function canBeStopped(meeting: MeetingFields): boolean {
  return isPublished(meeting) && !isStopped(meeting);
}

export function canBeCanceled(meeting: MeetingFields, currentDate?: Date): boolean {
  const compareDate = currentDate || new Date();
  return !isCanceled(meeting) && !isStarted(meeting) && !isInFuture(meeting, compareDate);
}
