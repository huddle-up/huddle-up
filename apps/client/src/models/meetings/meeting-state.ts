import { useCurrentTick } from '../../utils';
import { UserFields } from '../user/__generated-interfaces__/UserFields';
import { isCanceled, isInFuture, isInPast, isLive, isStopped } from './utils';
import { MeetingFields } from './__generated-interfaces__/MeetingFields';

export enum MeetingState {
  Void,
  Future,
  ReadyToStart,
  Started,
  Live,
  Stopped,
  Past,
  Canceled,
}

export function useMeetingState(meeting?: MeetingFields, user?: UserFields, currentDate?: Date): MeetingState {
  const compareDate = currentDate || new Date();
  if (!meeting) {
    return MeetingState.Void;
  }
  if (isCanceled(meeting)) {
    return MeetingState.Canceled;
  }

  if (!meeting.conference) {
    if (isInPast(meeting, compareDate)) {
      return MeetingState.Past;
    }
    return isInFuture(meeting, compareDate) ? MeetingState.Future : MeetingState.ReadyToStart;
  }
  if (isStopped(meeting)) {
    return MeetingState.Stopped;
  }
  if (isLive(meeting, user, compareDate)) {
    return MeetingState.Live;
  }
  return MeetingState.Started;
}

export function useWatchMeetingState(meeting?: MeetingFields, user?: UserFields) {
  // The state changes based on the current time, so we use an interval to make sure it updates
  const currentDate = useCurrentTick();

  return useMeetingState(meeting, user, currentDate);
}
