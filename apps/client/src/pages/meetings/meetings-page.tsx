import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { MeetingList } from '../../components/meeting';
import { Meetings, MeetingsVariables } from '../../models/meetings/__generated-interfaces__/Meetings';
import SearchField from '../../components/search/search-field';
import { MEETINGS } from '../../models/meetings';
import { AppPageAside, AppPageMain } from '../../components/app-page-layout';
import { SectionHeader } from '../../components/section-header';

function MeetingsPage() {
  const { t } = useTranslation();

  const { loading, error, data, refetch } = useQuery<Meetings, MeetingsVariables>(MEETINGS, {
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
          <SectionHeader icon={<PlayCircleOutlineIcon />} title={t('global.title.meetings')} />
          <MeetingList meetings={data.meetings} />
        </section>
      </AppPageMain>
    </>
  );
}

export default MeetingsPage;
