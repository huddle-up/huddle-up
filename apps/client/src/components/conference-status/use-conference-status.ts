import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { isFuture, parseISO } from 'date-fns';
import { useEffect, useMemo } from 'react';
import {
  CONFERENCE_ACCESS,
  CONFERENCE_BY_MEETING,
  CREATE_CONFERENCE,
  PUBLISH_CONFERENCE,
  STOP_CONFERENCE,
} from '../../models/conferences';
import { ConferenceAccess } from '../../models/conferences/__generated-interfaces__/ConferenceAccess';
import { ConferenceByMeeting } from '../../models/conferences/__generated-interfaces__/ConferenceByMeeting';
import {
  CreateConference,
  CreateConferenceVariables,
} from '../../models/conferences/__generated-interfaces__/CreateConference';
import {
  PublishConference,
  PublishConferenceVariables,
} from '../../models/conferences/__generated-interfaces__/PublishConference';
import {
  StopConference,
  StopConferenceVariables,
} from '../../models/conferences/__generated-interfaces__/StopConference';
import { MeetingFields } from '../../models/meetings/__generated-interfaces__/MeetingFields';
import { useUser } from '../../models/user';

/**
 * The state of the conference
 */
type ConferenceState =
  /**
   * The conference is loading
   */
  | 'loading'
  /**
   * The conference could not be loaded, or contains an error
   */
  | 'error'
  /**
   * The conference does not exist
   */
  | 'void'
  /**
   * The conference does not exist, but can be created by the host
   */
  | 'ready'
  /**
   * The conference has been created, but not opened to all participants
   */
  | 'created'
  /**
   * The conference has been started and is open to all participants
   */
  | 'published'
  /**
   * The conference has been stopped
   */
  | 'stopped';

/**
 * How the conference state should be displayed to the current user
 */
type DisplayState =
  /**
   * Something is loading
   */
  | 'loading'
  /**
   * An error has been encountered
   */
  | 'error'
  /**
   * The user is the host, but the conference cannot be created, yet
   */
  | 'early'
  /**
   * The user is not the host and the conference has not been published, yet
   */
  | 'pending'
  /**
   * The user is the host and the conference can be started
   */
  | 'start'
  /**
   * The user is the host and the conference has been created, but is not published, yet
   */
  | 'setup'
  /**
   * The user is the host and the conference is published
   */
  | 'manage'
  /**
   * The user is not the host, the conference is created and can be joined
   */
  | 'join'
  /**
   * The conference has ended
   */
  | 'ended';

type ConferenceRole = 'participant' | 'host';
interface UseConferenceStatusProps {
  meeting: MeetingFields;
}

function useConferenceQuery(meetingId: string, pollFrequency = 5) {
  const { loading, error, data } = useQuery<ConferenceByMeeting>(CONFERENCE_BY_MEETING, {
    variables: { meetingId },
    pollInterval: pollFrequency * 1000,
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
      mutate({ variables: { meetingId } });
    }
  };

  return {
    createConference,
    called,
    loading,
    error,
  };
}

function usePublishConference(conferenceId?: string) {
  const [mutate, { called, loading, error }] = useMutation<PublishConference, PublishConferenceVariables>(
    PUBLISH_CONFERENCE
  );

  const publishConference = () => {
    if (conferenceId) {
      mutate({ variables: { conferenceId } });
    }
  };
  return {
    publishConference,
    called,
    loading,
    error,
  };
}

function useStopConference(conferenceId?: string) {
  const [mutate, { called, loading, error }] = useMutation<StopConference, StopConferenceVariables>(STOP_CONFERENCE);

  const stopConference = () => {
    if (conferenceId) {
      mutate({ variables: { conferenceId } });
    }
  };
  return {
    stopConference,
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

const roleDisplayMapping: Record<ConferenceRole, Record<ConferenceState, DisplayState>> = {
  participant: {
    loading: 'loading',
    error: 'error',
    void: 'pending',
    created: 'pending',
    ready: 'pending',
    published: 'join',
    stopped: 'ended',
  },
  host: {
    loading: 'loading',
    error: 'error',
    void: 'early',
    ready: 'start',
    created: 'setup',
    published: 'manage',
    stopped: 'ended',
  },
};

export function useConferenceStatus({ meeting }: UseConferenceStatusProps) {
  const { user } = useUser();
  const { conference, ...conferenceQuery } = useConferenceQuery(meeting.id);
  const { createConference } = useCreateConference(meeting.id);
  const { publishConference } = usePublishConference(conference ? conference.id : undefined);
  const { stopConference } = useStopConference(conference ? conference.id : undefined);
  const { access, ...accessQuery } = useConferenceAccessQuery(conference ? conference.id : undefined);
  const isHost = meeting.host.id === user.id;

  const state: ConferenceState = useMemo(() => {
    if (conferenceQuery.error || accessQuery.error) {
      return 'error';
    }
    if (conferenceQuery.loading || accessQuery.loading) {
      return 'loading';
    }
    if (isFuture(parseISO(meeting.prepareDate))) {
      return 'void';
    }
    if (!conference) {
      return 'ready';
    }
    if (conference.stoppedAt) {
      return 'stopped';
    }
    if (conference.publishedAt) {
      return 'published';
    }
    return 'created';
  }, [conference, conferenceQuery, accessQuery, meeting]);

  const display: DisplayState = useMemo(() => {
    const role = isHost ? 'host' : 'participant';
    if (roleDisplayMapping[role] && roleDisplayMapping[role][state]) {
      return roleDisplayMapping[role][state];
    }
    return 'loading';
  }, [state, isHost]);

  return {
    error: conferenceQuery.error || accessQuery.error,
    conference,
    access,
    display,
    createConference,
    publishConference,
    stopConference,
  };
}
