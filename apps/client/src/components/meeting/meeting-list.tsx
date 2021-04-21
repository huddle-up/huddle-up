import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MeetingCard } from '.';
import { MyMeetings_myMeetings } from '../../pages/meetings/__generated-interfaces__/MyMeetings';
import { LinkButton } from '../link';

interface MeetingListProps {
  meetings: MyMeetings_myMeetings[];
}

function MeetingList({ meetings }: MeetingListProps) {
  const { t } = useTranslation();

  return (
    <div>
      {meetings ? (
        meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)
      ) : (
        <Typography>{t('meetings.noMeetingsPlaceholder')}</Typography>
      )}
      <LinkButton to="/meetings">{t('meetings.button.showmore')}</LinkButton>
    </div>
  );
}

export default MeetingList;
