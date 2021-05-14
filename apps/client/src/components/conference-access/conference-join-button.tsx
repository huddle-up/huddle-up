import { useQuery } from '@apollo/client';
import { Button, CircularProgress } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CONFERENCE_ACCESS } from '../../models/conferences';
import { ConferenceAccess } from '../../models/conferences/__generated-interfaces__/ConferenceAccess';

function ConferenceJoinButton({ conferenceId }: { conferenceId: string }) {
  const { t } = useTranslation();
  const { loading, data } = useQuery<ConferenceAccess>(CONFERENCE_ACCESS, { variables: { conferenceId } });

  if (loading) {
    return <CircularProgress size="2em" />;
  }

  return (
    <Button
      href={data.conferenceAccess.url}
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

export default ConferenceJoinButton;
