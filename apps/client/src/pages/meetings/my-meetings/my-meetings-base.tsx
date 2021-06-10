import { FilterList } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppPageAside, AppPageMain } from '../../../components/app-page-layout';
import { ErrorCard } from '../../../components/error';
import { LoadingContent } from '../../../components/loading';
import { SearchForm, SearchFormVariables } from '../../../components/search-form';
import { SectionHeader } from '../../../components/section-header';
import { MyMeetings_myMeetings } from '../../../models/meetings/__generated-interfaces__/MyMeetings';
import { OrderBy } from '../../../models/__generated-interfaces__/globalTypes';
import { useMyMeetingsSearch } from './use-my-meetings-search';

interface MyMeetingsBaseRenderProps {
  data: MyMeetings_myMeetings;
  isLoadingMore: boolean;
  loadMore: () => Promise<void>;
}

interface MyMeetingsBaseProps {
  orderBy: OrderBy;
  children: (renderProps: MyMeetingsBaseRenderProps) => React.ReactNode;
  direction?: 'past' | 'future';
}

function MyMeetingsBase({ orderBy, children, direction }: MyMeetingsBaseProps) {
  const { t } = useTranslation();

  const initialValues = {
    searchValue: '',
    tags: [],
    fromDate: null,
    toDate: null,
  };

  const { loading, error, data, search, loadMore, isLoadingMore } = useMyMeetingsSearch(initialValues, orderBy);

  if (error) {
    return <ErrorCard isInline={false} detail={error.message} />;
  }

  if (loading) {
    return <LoadingContent />;
  }

  async function onSearch({ tags, ...values }: SearchFormVariables) {
    search({
      tags: tags.map((tag) => {
        return { id: tag.id, name: tag.name };
      }),
      ...values,
    });
  }

  return (
    <>
      <AppPageAside noMarginTop>
        <SectionHeader icon={<FilterList />} title={t('meetings.search.filterSection')} />
        <SearchForm
          onSubmit={onSearch}
          initialValues={initialValues}
          searchPast={direction === 'future'}
          searchFuture={direction === 'past'}
        />
      </AppPageAside>
      <AppPageMain noMarginTop>{children({ data: data.myMeetings, isLoadingMore, loadMore })}</AppPageMain>
    </>
  );
}
MyMeetingsBase.defaultProps = {
  direction: 'future',
};

export default MyMeetingsBase;
