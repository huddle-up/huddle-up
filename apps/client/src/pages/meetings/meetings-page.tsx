import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { Collapse } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FilterListIcon from '@material-ui/icons/FilterList';
import isEqual from 'lodash.isequal';
import { MeetingList } from '../../components/meeting';
import { Meetings, MeetingsVariables } from '../../models/meetings/__generated-interfaces__/Meetings';
import { isLive, MEETINGS } from '../../models/meetings';
import { AppPageAside, AppPageMain } from '../../components/app-page-layout';
import { SectionHeader } from '../../components/section-header';
import { SearchForm, SearchFormVariables } from '../../components/search-form';
import { OrderBy } from '../../models/__generated-interfaces__/globalTypes';
import { ShowMore } from '../../components/show-more';
import { ROUTES } from '../../routes';
import { AppPageTitle } from '../../components/app-page-title';
import { LoadingContent } from '../../components/loading';
import { ErrorCard } from '../../components/error';
import { useUser } from '../../models/user';

interface MeetingsPageListProps {
  data: Meetings;
  onLoadMore: () => void;
  isLoadingMore: boolean;
}

function MeetingsPageList({ data, onLoadMore, isLoadingMore }: MeetingsPageListProps) {
  const { t } = useTranslation();
  const { user } = useUser();

  const { meetings, totalCount } = data.discover;

  return (
    <AppPageMain noMarginTop>
      <section>
        <SectionHeader icon={<PlayCircleOutlineIcon />} title={t('meetings.title.ongoing')} />
        <MeetingList
          linkTemplate={ROUTES.meetings.allMeetingsMeeting}
          meetings={meetings.filter((meeting) => isLive(meeting, user))}
        />
      </section>
      <section>
        <SectionHeader icon={<CalendarTodayIcon />} title={t('meetings.title.upcoming')} />
        <MeetingList
          linkTemplate={ROUTES.meetings.allMeetingsMeeting}
          meetings={meetings.filter((meeting) => !isLive(meeting, user))}
        />
      </section>
      <Collapse in={totalCount > meetings.length}>
        <ShowMore
          totalCount={totalCount}
          currentCount={meetings.length}
          onClick={onLoadMore}
          isLoading={isLoadingMore}
        />
      </Collapse>
    </AppPageMain>
  );
}

function useMeetingsSearch(initialValues: SearchFormVariables, defaultOrderBy: OrderBy) {
  const [currentSearch, setCurrentSearch] = useState(initialValues);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [previousData, setPreviousData] = useState(null);

  const baseOptions = {
    startDateOrderBy: defaultOrderBy,
    offset: 0,
    limit: 10,
  };

  const { loading, error, data, refetch } = useQuery<Meetings, MeetingsVariables>(MEETINGS, {
    variables: {
      ...currentSearch,
      ...baseOptions,
    },
  });

  const search = async (values: SearchFormVariables) => {
    setPreviousData(null);
    if (isEqual(currentSearch, values)) {
      refetch(baseOptions);
    } else {
      setCurrentSearch(values);
    }
  };

  const loadMore = async () => {
    setPreviousData(data);
    setIsLoadingMore(true);
    await refetch({ limit: data.discover.meetings.length + baseOptions.limit });
    setIsLoadingMore(false);
  };

  return {
    loading: loading && !isLoadingMore,
    error,
    data: isLoadingMore ? previousData : data,
    search,
    loadMore,
    isLoadingMore,
  };
}

function MeetingsPage() {
  const { t } = useTranslation();

  const initialValues = {
    searchValue: '',
    tags: [],
    fromDate: null,
    toDate: null,
  };

  const { loading, error, data, search, loadMore, isLoadingMore } = useMeetingsSearch(initialValues, OrderBy.ASC);

  if (error) {
    return (
      <AppPageMain noAside noMarginTop>
        <ErrorCard isInline={false} detail={error.message} />
      </AppPageMain>
    );
  }

  async function onSearch({ tags, ...values }: SearchFormVariables) {
    search({
      tags: tags.map((tag) => {
        return { id: tag.id, name: tag.name };
      }),
      ...values,
    });
  }

  const onLoadMore = () => {
    loadMore();
  };

  return (
    <>
      <AppPageTitle title={t('global.title.allMeetings')} />
      <AppPageAside noMarginTop>
        <SectionHeader icon={<FilterListIcon />} title={t('meetings.search.filterSection')} />
        <SearchForm onSubmit={onSearch} initialValues={initialValues} />
      </AppPageAside>
      {loading ? (
        <LoadingContent />
      ) : (
        <MeetingsPageList data={data} onLoadMore={onLoadMore} isLoadingMore={isLoadingMore} />
      )}
    </>
  );
}

export default MeetingsPage;
