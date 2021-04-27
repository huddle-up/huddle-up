import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { CONFERENCE_ACCESS, CONFERENCE_BY_MEETING, CREATE_CONFERENCE } from '../../models/conferences';
import { ConferenceAccess } from '../../models/conferences/__generated-interfaces__/ConferenceAccess';
import { ConferenceByMeeting } from '../../models/conferences/__generated-interfaces__/ConferenceByMeeting';
import {
  CreateConference,
  CreateConferenceVariables,
} from '../../models/conferences/__generated-interfaces__/CreateConference';
import { useUser } from '../../models/user';

type ConferenceState = 'loading' | 'error' | 'void' | 'created' | 'started' | 'published' | 'stopped';

type DisplayState = 'loading' | 'pending' | 'start' | 'setup' | 'join' | 'ended' | 'error';

interface UseConferenceStatusProps {
  meeting: {
    id: string;
    host: {
      id: string;
    };
  };
}

function useConferenceQuery(meetingId: string) {
  const { loading, error, data } = useQuery<ConferenceByMeeting>(CONFERENCE_BY_MEETING, {
    variables: { meetingId },
  });

  return {
    loading,
    error,
    conference: data ? data.conferenceByMeeting : null,
  };
}

function useCreateConference(meetingId: string) {
  const [mutate, { called, loading, error }] = useMutation<CreateConference, CreateConferenceVariables>(
    CREATE_CONFERENCE
  );

  const createConference = () => {
    if (!called) {
      mutate({ variables: { meetingId }, refetchQueries: ['ConferenceByMeeting'] });
    }
  };

  return {
    createConference,
    called,
    loading,
    error,
  };
}

function useConferenceAccessQuery(conferenceId?: string) {
  const [getAccess, { called, loading, error, data }] = useLazyQuery<ConferenceAccess>(CONFERENCE_ACCESS, {
    variables: { conferenceId },
  });

  useEffect(() => {
    if (!called && conferenceId) {
      getAccess();
    }
  }, [called, conferenceId, getAccess]);

  return {
    loading,
    error,
    access: data ? data.conferenceAccess : null,
  };
}

export function useConferenceStatus({ meeting }: UseConferenceStatusProps) {
  const { user } = useUser();
  const { conference, ...conferenceQuery } = useConferenceQuery(meeting.id);
  const { createConference } = useCreateConference(meeting.id);
  const { access, ...accessQuery } = useConferenceAccessQuery(conference ? conference.id : undefined);
  const isHost = meeting.host.id === user.id;

  const state: ConferenceState = useMemo(() => {
    if (conferenceQuery.error || accessQuery.error) {
      return 'error';
    }
    if (conferenceQuery.loading || accessQuery.loading) {
      return 'loading';
    }
    if (!conference) {
      return 'void';
    }
    return 'created';
  }, [conference, conferenceQuery, accessQuery]);

  const display: DisplayState = useMemo(() => {
    switch (state) {
      case 'void':
        return isHost ? 'start' : 'pending';
      case 'created':
        return 'join';
      case 'error':
        return 'error';
      case 'loading':
      default:
        return 'loading';
    }
  }, [state, isHost]);

  return {
    error: conferenceQuery.error || accessQuery.error,
    conference,
    access,
    display,
    createConference,
  };
}
