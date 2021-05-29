import React from 'react';
import { useTranslation } from 'react-i18next';
import { MeetingCard } from '.';
import { Meeting_meeting as Meeting } from '../../models/meetings/__generated-interfaces__/Meeting';
import { ROUTES } from '../../routes';
import NoEntryCard from '../no-entry-card/no-meeting-card';

interface MeetingListProps {
  meetings: Meeting[];
  linkTemplate?: string;
}

function MeetingList({ meetings, linkTemplate }: MeetingListProps) {
  const { t } = useTranslation();
  return (
    <div>
      {meetings && meetings.length > 0 ? (
        meetings.map((meeting) => <MeetingCard linkTemplate={linkTemplate} key={meeting.id} meeting={meeting} />)
      ) : (
        <NoEntryCard message={t('meetings.noMeetingsPlaceholder')} />
      )}
    </div>
  );
}
MeetingList.defaultProps = {
  linkTemplate: ROUTES.meetings.meeting,
};

export default MeetingList;
