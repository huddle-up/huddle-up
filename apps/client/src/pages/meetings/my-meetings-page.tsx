import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { MeetingList } from '../../components/meeting';
import { MyMeetings, MyMeetingsVariables } from '../../models/meetings/__generated-interfaces__/MyMeetings';
import SearchField from '../../components/search/search-field';
import { MY_MEETINGS } from '../../models/meetings';
import { AppPageAside, AppPageMain } from '../../components/app-page-layout';
import { SectionHeader } from '../../components/section-header';
import { isInFutureFilter, isInPastFilter, isWithinIntervalFilter } from '../../utils';

function MyMeetingsPage() {
  const { t } = useTranslation();

  const { loading, error, data, refetch } = useQuery<MyMeetings, MyMeetingsVariables>(MY_MEETINGS, {
    variables: { value: '' },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  function onSearch(value: string) {
    refetch({
      value,
    });
  }
  function onReset() {
    refetch({
      value: '',
    });
  }

  return (
    <>
      <AppPageAside>
        <SearchField placeholderText={t('meetings.searchPlaceholder')} onSearch={onSearch} onReset={onReset} />
      </AppPageAside>
      <AppPageMain>
        <section>
          <SectionHeader icon={<PlayCircleOutlineIcon />} title={t('meetings.title.ongoing')} />
          <MeetingList meetings={isWithinIntervalFilter(data.myMeetings)} />
          {/* TODO: differentiate meetings i created and i joined */}
          {/* import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt'; */}
          {/* <SectionHeader icon={<SentimentSatisfiedAltIcon />} title={t('meetings.title.createdByMe')} /> */}
          <SectionHeader icon={<CalendarTodayIcon />} title={t('meetings.title.upcoming')} />
          <MeetingList meetings={isInFutureFilter(data.myMeetings)} />
          <SectionHeader icon={<AccessTimeIcon />} title={t('meetings.title.past')} />
          <MeetingList meetings={isInPastFilter(data.myMeetings)} />
        </section>
      </AppPageMain>
    </>
  );
}

export default MyMeetingsPage;
