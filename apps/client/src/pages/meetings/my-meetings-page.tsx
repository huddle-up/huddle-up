import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FilterListIcon from '@material-ui/icons/FilterList';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { MeetingList } from '../../components/meeting';
import { MyMeetings, MyMeetingsVariables } from '../../models/meetings/__generated-interfaces__/MyMeetings';
import { MY_MEETINGS } from '../../models/meetings';
import { AppPageAside, AppPageMain } from '../../components/app-page-layout';
import { SectionHeader } from '../../components/section-header';
import { isInFutureFilter, isInPastFilter, isWithinIntervalFilter } from '../../utils';
import { SearchForm } from '../../components/search-form';
import { MeetingsVariables } from '../../models/meetings/__generated-interfaces__/Meetings';
import { OrderBy } from '../../models/__generated-interfaces__/globalTypes';

function MyMeetingsPage() {
  const { t } = useTranslation();

  const initialValues: MeetingsVariables = {
    searchValue: '',
    startDateOrderBy: OrderBy.DESC,
    fromDate: null,
    toDate: null,
  };

  const { loading, error, data, refetch } = useQuery<MyMeetings, MyMeetingsVariables>(MY_MEETINGS, {
    variables: initialValues,
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  async function onSearch({ searchValue, startDateOrderBy, fromDate, toDate }: MeetingsVariables) {
    await refetch({
      searchValue,
      startDateOrderBy,
      fromDate,
      toDate,
    });
  }
  return (
    <>
      <AppPageAside>
        <SectionHeader icon={<FilterListIcon />} title={t('filter.filterSection')} />
        <SearchForm onSubmit={onSearch} initialValues={initialValues} />
      </AppPageAside>
      <AppPageMain>
        <section>
          <SectionHeader icon={<PlayCircleOutlineIcon />} title={t('meetings.title.ongoing')} />
          <MeetingList meetings={isWithinIntervalFilter(data.myMeetings)} />
        </section>
        {/* TODO: differentiate meetings i created and i joined */}
        {/* import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt'; */}
        {/* <SectionHeader icon={<SentimentSatisfiedAltIcon />} title={t('meetings.title.createdByMe')} /> */}
        <section>
          <SectionHeader icon={<CalendarTodayIcon />} title={t('meetings.title.upcoming')} />
          <MeetingList meetings={isInFutureFilter(data.myMeetings)} />
        </section>
        <section>
          <SectionHeader icon={<AccessTimeIcon />} title={t('meetings.title.past')} />
          <MeetingList meetings={isInPastFilter(data.myMeetings)} />
        </section>
      </AppPageMain>
    </>
  );
}

export default MyMeetingsPage;
