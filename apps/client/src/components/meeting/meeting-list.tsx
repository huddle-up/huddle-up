import React from 'react';
import { useTranslation } from 'react-i18next';
import { MeetingCard } from '.';
import { MyMeetings_myMeetings } from '../../models/meetings/__generated-interfaces__/MyMeetings';
import { LinkButton } from '../link';
import NoEntryCard from '../no-entry-card/no-meeting-card';

interface MeetingListProps {
  meetings: MyMeetings_myMeetings[];
}

function MeetingList({ meetings }: MeetingListProps) {
  const { t } = useTranslation();

  return (
    <div>
      {meetings && meetings.length > 0 ? (
        meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)
      ) : (
        <NoEntryCard message={t('meetings.noMeetingsPlaceholder')} />
      )}
      <LinkButton to="/meetings">{t('meetings.button.showmore')}</LinkButton>
    </div>
  );
}

export default MeetingList;
