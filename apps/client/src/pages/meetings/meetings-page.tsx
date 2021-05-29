import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { Collapse } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FilterListIcon from '@material-ui/icons/FilterList';
import { MeetingList } from '../../components/meeting';
import { Meetings, MeetingsVariables } from '../../models/meetings/__generated-interfaces__/Meetings';
import { MEETINGS } from '../../models/meetings';
import { AppPageAside, AppPageMain } from '../../components/app-page-layout';
import { SectionHeader } from '../../components/section-header';
import { isInFutureFilter, isWithinIntervalFilter } from '../../utils';
import { SearchForm, SearchFormVariables } from '../../components/search-form';
import { OrderBy } from '../../models/__generated-interfaces__/globalTypes';
import { ShowMore } from '../../components/show-more';
import { ROUTES } from '../../routes';

function useMeetingsSearch(initialValues: SearchFormVariables, defaultOrderBy: OrderBy) {
  const [currentSearch, setCurrentSearch] = useState(initialValues);
  const baseOptions = {
    startDateOrderBy: defaultOrderBy,
    offset: 0,
    limit: 5,
  };

  const getQueryVariables = () => ({
    ...currentSearch,
    ...baseOptions,
  });

  const { loading, error, data, refetch } = useQuery<Meetings, MeetingsVariables>(MEETINGS, {
    variables: getQueryVariables(),
  });

  const search = (values: SearchFormVariables) => {
    setCurrentSearch(values);
    refetch(getQueryVariables());
  };

  const loadMore = () => {
    refetch({ limit: data.discover.meetings.length + baseOptions.limit });
  };

  return { loading, error, data, search, loadMore };
}

function MeetingsPage() {
  const { t } = useTranslation();

  const initialValues = {
    searchValue: '',
    tags: [],
    fromDate: null,
    toDate: null,
  };

  const { loading, error, data, search, loadMore } = useMeetingsSearch(initialValues, OrderBy.ASC);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  async function onSearch({ tags, ...values }: SearchFormVariables) {
    search({
      tags: tags.map((tag) => {
        return { id: tag.id, name: tag.name };
      }),
      ...values,
    });
  }
  const { totalCount } = data.discover;
  // TODO: Filter out stopped meetings in query?
  const meetings = data.discover.meetings.filter((meeting) => !meeting.conference || !meeting.conference.stoppedAt);
  const handlePageLimit = () => {
    loadMore();
  };

  return (
    <>
      <AppPageAside>
        <SectionHeader icon={<FilterListIcon />} title={t('meetings.search.filterSection')} />
        <SearchForm onSubmit={onSearch} initialValues={initialValues} />
      </AppPageAside>
      <AppPageMain>
        <section>
          <SectionHeader icon={<PlayCircleOutlineIcon />} title={t('meetings.title.ongoing')} />
          <MeetingList linkTemplate={ROUTES.meetings.discoverMeeting} meetings={isWithinIntervalFilter(meetings)} />
        </section>
        <section>
          <SectionHeader icon={<CalendarTodayIcon />} title={t('meetings.title.upcoming')} />
          <MeetingList linkTemplate={ROUTES.meetings.discoverMeeting} meetings={isInFutureFilter(meetings)} />
        </section>
        <Collapse in={totalCount > meetings.length}>
          <ShowMore
            totalCount={totalCount}
            currentCount={meetings.length}
            onClick={handlePageLimit}
            isLoading={loading}
          />
        </Collapse>
      </AppPageMain>
    </>
  );
}

export default MeetingsPage;
