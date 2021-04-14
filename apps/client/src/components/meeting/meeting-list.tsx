import React from 'react';
import { useTranslation } from 'react-i18next';
import { MeetingCard } from '.';
import { Meetings_meetings } from '../../pages/meetings/__generated-interfaces__/Meetings';
import { LinkButton } from '../link';

interface MeetingListProps {
  meetings: Meetings_meetings[];
}

function MeetingList({ meetings }: MeetingListProps) {
  const { t } = useTranslation();

  return (
    <div>
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} meeting={meeting} />
      ))}
      <LinkButton to="/meetings">{t('meetings.button.showmore')}</LinkButton>
    </div>
  );
}

export default MeetingList;
