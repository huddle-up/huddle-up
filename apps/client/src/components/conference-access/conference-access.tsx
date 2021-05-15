import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { EventBusy, History, PlayCircleFilled, Schedule } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MeetingState } from '../../models/meetings';
import { MeetingFields } from '../../models/meetings/__generated-interfaces__/MeetingFields';
import { useUser } from '../../models/user';
import { UserFields } from '../../models/user/__generated-interfaces__/UserFields';
import ConferenceJoinButton from './conference-join-button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5),
    paddingRight: 0,
    '& > :not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
}));

interface ConferenceAccessProps {
  meeting: MeetingFields;
  state: MeetingState;
}

interface ContentProps extends ConferenceAccessProps {
  user: UserFields;
}

function ContentRoot({ children }: { children: React.ReactNode }) {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
}

function HostContent({ meeting, state, user }: ContentProps) {
  const { t } = useTranslation();
  if (state.isLoading) {
    return (
      <ContentRoot>
        <CircularProgress size="2em" />
      </ContentRoot>
    );
  }
  return (
    <ContentRoot>
      {state.isInFuture && (
        <>
          <Schedule />
          <Typography component="span" variant="body2">
            {t('meetings.conference.state.early')}
          </Typography>
        </>
      )}
      {state.canStart(user) && (
        <>
          <PlayCircleFilled />
          <Typography component="span" variant="body2">
            {t('meetings.conference.state.ready')}
          </Typography>
        </>
      )}
      {(state.isStarted || state.isPublished) && state.canJoin(user) && (
        <ConferenceJoinButton conferenceId={meeting.conference.id} />
      )}
      {state.isStopped && (
        <>
          <EventBusy />
          <Typography component="span" variant="body2">
            {t('meetings.conference.state.ended')}
          </Typography>
        </>
      )}
      {state.isInPast && (
        <>
          <History />
          <Typography component="span" variant="body2">
            {t('meetings.conference.state.past')}
          </Typography>
        </>
      )}
    </ContentRoot>
  );
}

function UserContent({ meeting, state, user }: ContentProps) {
  const { t } = useTranslation();
  if (state.isLoading) {
    return (
      <ContentRoot>
        <CircularProgress size="2em" />
      </ContentRoot>
    );
  }
  return (
    <ContentRoot>
      {(state.isInFuture || state.isReadyToStart || state.isStarted) && (
        <>
          <Schedule />
          <Typography component="span" variant="body2">
            {t('meetings.conference.state.pending')}
          </Typography>
        </>
      )}
      {state.isPublished && state.canJoin(user) && <ConferenceJoinButton conferenceId={meeting.conference.id} />}
      {state.isStopped && (
        <>
          <EventBusy />
          <Typography component="span" variant="body2">
            {t('meetings.conference.state.ended')}
          </Typography>
        </>
      )}
      {state.isInPast && (
        <>
          <History />
          <Typography component="span" variant="body2">
            {t('meetings.conference.state.neverStarted')}
          </Typography>
        </>
      )}
    </ContentRoot>
  );
}

function ConferenceAccess({ meeting, state }: ConferenceAccessProps) {
  const { user } = useUser();
  const ContentComponent = user.id === meeting.host.id ? HostContent : UserContent;
  return <ContentComponent meeting={meeting} state={state} user={user} />;
}

export default ConferenceAccess;
