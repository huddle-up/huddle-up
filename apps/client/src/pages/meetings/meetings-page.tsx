import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FilterListIcon from '@material-ui/icons/FilterList';
import { MeetingList } from '../../components/meeting';
import { Meetings, MeetingsVariables } from '../../models/meetings/__generated-interfaces__/Meetings';
import { MEETINGS } from '../../models/meetings';
import { AppPageAside, AppPageMain } from '../../components/app-page-layout';
import { SectionHeader } from '../../components/section-header';
import { isInFutureFilter, isWithinIntervalFilter } from '../../utils';
import { SearchForm } from '../../components/search-form';
import { OrderBy } from '../../models/__generated-interfaces__/globalTypes';

function MeetingsPage() {
  const { t } = useTranslation();

  const { loading, error, data, refetch } = useQuery<Meetings, MeetingsVariables>(MEETINGS, {
    variables: { searchValue: '', startDateOrderBy: OrderBy.DESC },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  async function onSearch({ searchValue, startDateOrderBy }: MeetingsVariables) {
    await refetch({
      searchValue,
      startDateOrderBy,
    });
  }

  return (
    <>
      <AppPageAside>
        <section>
          <SectionHeader icon={<FilterListIcon />} title={t('filter.filterSection')} />
          <SearchForm onSubmit={onSearch} initialValues={{ searchValue: '', startDateOrderBy: OrderBy.DESC }} />
        </section>
      </AppPageAside>
      <AppPageMain>
        <section>
          <SectionHeader icon={<PlayCircleOutlineIcon />} title={t('meetings.title.ongoing')} />
          <MeetingList meetings={isWithinIntervalFilter(data.meetings)} />
          <SectionHeader icon={<CalendarTodayIcon />} title={t('meetings.title.upcoming')} />
          <MeetingList meetings={isInFutureFilter(data.meetings)} />
        </section>
      </AppPageMain>
    </>
  );
}

export default MeetingsPage;
