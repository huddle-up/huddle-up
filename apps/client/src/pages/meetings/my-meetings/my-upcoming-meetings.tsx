import { Collapse } from '@material-ui/core';
import { CalendarToday, PlayCircleOutline } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MeetingList } from '../../../components/meeting';
import { SectionHeader } from '../../../components/section-header';
import { ShowMore } from '../../../components/show-more';
import { isLive } from '../../../models/meetings';
import { useUser } from '../../../models/user';
import { OrderBy } from '../../../models/__generated-interfaces__/globalTypes';
import MyMeetingsBase from './my-meetings-base';

function MyUpcomingMeetings() {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <MyMeetingsBase orderBy={OrderBy.ASC} direction="future">
      {({ data, isLoadingMore, loadMore }) => {
        const { meetings: myMeetings, totalCount } = data;
        return (
          <>
            <section>
              <SectionHeader icon={<PlayCircleOutline />} title={t('meetings.title.ongoing')} />
              <MeetingList meetings={myMeetings.filter((meeting) => isLive(meeting, user))} />
            </section>
            <section>
              <SectionHeader icon={<CalendarToday />} title={t('meetings.title.upcoming')} />
              <MeetingList meetings={myMeetings.filter((meeting) => !isLive(meeting, user))} />
            </section>
            <Collapse in={totalCount > myMeetings.length}>
              <ShowMore
                totalCount={totalCount}
                currentCount={myMeetings.length}
                onClick={loadMore}
                isLoading={isLoadingMore}
              />
            </Collapse>
          </>
        );
      }}
    </MyMeetingsBase>
  );
}

export default MyUpcomingMeetings;
