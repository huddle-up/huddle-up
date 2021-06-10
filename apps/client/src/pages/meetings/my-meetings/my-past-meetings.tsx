import { Collapse } from '@material-ui/core';
import { AccessTime } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MeetingList } from '../../../components/meeting';
import { SectionHeader } from '../../../components/section-header';
import { ShowMore } from '../../../components/show-more';
import { OrderBy } from '../../../models/__generated-interfaces__/globalTypes';
import MyMeetingsBase from './my-meetings-base';

function MyPastMeetings() {
  const { t } = useTranslation();
  return (
    <MyMeetingsBase orderBy={OrderBy.DESC} direction="past">
      {({ data, isLoadingMore, loadMore }) => {
        const { meetings: myMeetings, totalCount } = data;
        return (
          <>
            <section>
              <SectionHeader icon={<AccessTime />} title={t('meetings.title.past')} />
              <MeetingList meetings={myMeetings} />
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

export default MyPastMeetings;
