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
import { isHostOrParticipant, isInFutureFilter, isInPastFilter, isWithinIntervalFilter } from '../../utils';
import { SearchForm, SearchFormVariables } from '../../components/search-form';
import { OrderBy } from '../../models/__generated-interfaces__/globalTypes';
import { ShowMoreCard } from '../../components/show-more-card';
import { useUser } from '../../models/user';

function MyMeetingsPage() {
  const { t } = useTranslation();
  const { user } = useUser();

  const initialValues = {
    searchValue: '',
    tags: [],
    fromDate: null,
    toDate: null,
  };

  const baseOptions = {
    startDateOrderBy: OrderBy.DESC,
    offset: 0,
    limit: 5,
  };

  const { loading, error, data, refetch } = useQuery<MyMeetings, MyMeetingsVariables>(MY_MEETINGS, {
    variables: {
      ...initialValues,
      ...baseOptions,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  async function onSearch({ searchValue, tags, fromDate, toDate }: SearchFormVariables) {
    await refetch({
      searchValue,
      tags: tags.map((tag) => {
        return { id: tag.id, name: tag.name };
      }),
      fromDate,
      toDate,
      ...baseOptions,
    });
  }

  const { meetings, totalCount } = data.myMeetings;
  const handlePageLimit = (all?: boolean) => {
    const newLimit = all ? totalCount : baseOptions.limit + meetings.length;
    refetch({ limit: newLimit });
  };

  const myMeetings = isHostOrParticipant(user, meetings);

  return (
    <>
      <AppPageAside>
        <SectionHeader icon={<FilterListIcon />} title={t('meetings.search.filterSection')} />
        <SearchForm onSubmit={onSearch} initialValues={initialValues} />
        {totalCount > meetings.length && (
          <ShowMoreCard
            title={`${t('global.title.myMeetings')} (${meetings.length}/${totalCount})`}
            limit={baseOptions.limit}
            handlePageLimit={handlePageLimit}
          />
        )}
      </AppPageAside>
      <AppPageMain>
        <section>
          <SectionHeader icon={<PlayCircleOutlineIcon />} title={t('meetings.title.ongoing')} />
          <MeetingList meetings={isWithinIntervalFilter(myMeetings)} />
        </section>
        <section>
          <SectionHeader icon={<CalendarTodayIcon />} title={t('meetings.title.upcoming')} />
          <MeetingList meetings={isInFutureFilter(myMeetings)} />
        </section>
        <section>
          <SectionHeader icon={<AccessTimeIcon />} title={t('meetings.title.past')} />
          <MeetingList meetings={isInPastFilter(myMeetings)} />
        </section>
      </AppPageMain>
    </>
  );
}

export default MyMeetingsPage;
