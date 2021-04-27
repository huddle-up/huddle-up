import { Button, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { PersonAdd, PlayArrow, Schedule } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useConferenceStatus } from './use-conference-status';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5),
  },
  pendingIcon: {
    marginRight: theme.spacing(1),
  },
}));

interface ConferenceStatusProps {
  meeting: {
    id: string;
    host: {
      id: string;
    };
  };
}
function StartConferenceContent({ onCreate }: { onCreate: () => void }) {
  const { t } = useTranslation();
  return (
    <Button onClick={onCreate} variant="contained" color="secondary" disableElevation startIcon={<PlayArrow />}>
      {t('meetings.conference.start')}
    </Button>
  );
}

function ConferencePendingContent() {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <>
      <Schedule className={classes.pendingIcon} />
      <Typography component="span" variant="body2">
        {t('meetings.conference.pending')}
      </Typography>
    </>
  );
}

function JoinConferenceContent({ url }: { url: string }) {
  const { t } = useTranslation();
  return (
    <Button
      href={url}
      target="_BLANK"
      rel="noreferrer noopener"
      variant="contained"
      color="secondary"
      disableElevation
      startIcon={<PersonAdd />}>
      {t('meetings.conference.join')}
    </Button>
  );
}

function ConferenceStatus({ meeting }: ConferenceStatusProps) {
  const classes = useStyles();
  const { display, createConference, access } = useConferenceStatus({ meeting });
  return (
    <div className={classes.root}>
      {display === 'loading' && <CircularProgress size="2em" />}
      {display === 'pending' && <ConferencePendingContent />}
      {display === 'start' && <StartConferenceContent onCreate={createConference} />}
      {display === 'join' && access && <JoinConferenceContent url={access.url} />}
    </div>
  );
}

export default ConferenceStatus;
