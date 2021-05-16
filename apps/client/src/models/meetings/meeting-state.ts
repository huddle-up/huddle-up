import { isAfter, isBefore, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { UserFields } from '../user/__generated-interfaces__/UserFields';
import { MeetingFields } from './__generated-interfaces__/MeetingFields';

enum MeetingStates {
  Void,
  Future,
  ReadyToStart,
  Started,
  Published,
  Stopped,
  Past,
}

function getMeetingState(meeting?: MeetingFields, currentDate?: Date): MeetingStates {
  const compareDate = currentDate || new Date();
  if (!meeting) {
    return MeetingStates.Void;
  }
  const { conference } = meeting;
  if (!conference) {
    if (isBefore(parseISO(meeting.endDate), compareDate)) {
      return MeetingStates.Past;
    }
    return isAfter(parseISO(meeting.prepareDate), compareDate) ? MeetingStates.Future : MeetingStates.ReadyToStart;
  }
  if (conference.stoppedAt) {
    return MeetingStates.Stopped;
  }
  if (conference.publishedAt) {
    return MeetingStates.Published;
  }
  return MeetingStates.Started;
}

export function useMeetingState(meeting?: MeetingFields) {
  // The state changes based on the current time, so we use an interval to make sure it updates
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentState = getMeetingState(meeting, currentDate);

  const states = {
    isLoading: currentState === MeetingStates.Void,
    isInFuture: currentState === MeetingStates.Future,
    isReadyToStart: currentState === MeetingStates.ReadyToStart,
    isStarted: currentState === MeetingStates.Started,
    isPublished: currentState === MeetingStates.Published,
    isStopped: currentState === MeetingStates.Stopped,
    isInPast: currentState === MeetingStates.Past,
  };

  // TODO: Move access control to separate module
  const isHost = (user: UserFields) => meeting && meeting.host.id === user.id;
  const isParticipant = (user: UserFields) => meeting && meeting.participations.some((p) => p.user.id === user.id);
  const actions = {
    canStart: (user: UserFields) => isHost(user) && states.isReadyToStart,
    canStop: (user: UserFields) => isHost(user) && states.isPublished,
    canManage: (user: UserFields) => isHost(user) && (states.isReadyToStart || states.isStarted || states.isPublished),
    canJoin: (user: UserFields) =>
      isHost(user) ? states.isStarted || states.isPublished : isParticipant(user) && states.isPublished,
    isParticipant,
    isHost,
  };

  return {
    ...states,
    ...actions,
  };
}

export type MeetingState = ReturnType<typeof useMeetingState>;
