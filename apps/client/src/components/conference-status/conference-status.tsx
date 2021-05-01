import { Button, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { EventBusy, PersonAdd, PlayArrow, Schedule, Stop, Tune } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MeetingFields } from '../../models/meetings/__generated-interfaces__/MeetingFields';
import { useConferenceStatus } from './use-conference-status';

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

interface ConferenceStatusProps {
  meeting: MeetingFields;
}

function StartConferenceContent({ onCreate }: { onCreate: () => void }) {
  const { t } = useTranslation();
  return (
    <Button onClick={onCreate} variant="contained" color="secondary" disableElevation startIcon={<PlayArrow />}>
      {t('meetings.conference.start')}
    </Button>
  );
}

function SetupConferenceContent({ url, onPublish }: { url: string; onPublish: () => void }) {
  const { t } = useTranslation();
  return (
    <>
      <Button
        href={url}
        target="_BLANK"
        rel="noreferrer noopener"
        variant="outlined"
        color="secondary"
        disableElevation
        startIcon={<Tune />}>
        {t('meetings.conference.setup')}
      </Button>
      <Button
        onClick={onPublish}
        type="button"
        variant="contained"
        color="secondary"
        disableElevation
        startIcon={<PlayArrow />}>
        {t('meetings.conference.publish')}
      </Button>
    </>
  );
}

function ConferencePendingContent({ label }: { label: string }) {
  return (
    <>
      <Schedule />
      <Typography component="span" variant="body2">
        {label}
      </Typography>
    </>
  );
}

function ConferenceEndedContent() {
  const { t } = useTranslation();
  return (
    <>
      <EventBusy />
      <Typography component="span" variant="body2">
        {t('meetings.conference.ended')}
      </Typography>
    </>
  );
}

function ManageConferenceContent({ url, onStop }: { url: string; onStop: () => void }) {
  const { t } = useTranslation();
  return (
    <>
      <Button onClick={onStop} type="button" variant="outlined" color="secondary" disableElevation startIcon={<Stop />}>
        {t('meetings.conference.stop')}
      </Button>
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
  const { t } = useTranslation();
  const { display, createConference, publishConference, stopConference, access } = useConferenceStatus({ meeting });
  return (
    <div className={classes.root}>
      {display === 'loading' && <CircularProgress size="2em" />}
      {display === 'early' && <ConferencePendingContent label={t('meetings.conference.early')} />}
      {display === 'pending' && <ConferencePendingContent label={t('meetings.conference.pending')} />}
      {display === 'start' && <StartConferenceContent onCreate={createConference} />}
      {display === 'setup' && access && <SetupConferenceContent url={access.url} onPublish={publishConference} />}
      {display === 'manage' && access && <ManageConferenceContent url={access.url} onStop={stopConference} />}
      {display === 'join' && access && <JoinConferenceContent url={access.url} />}
      {display === 'ended' && <ConferenceEndedContent />}
    </div>
  );
}

export default ConferenceStatus;
