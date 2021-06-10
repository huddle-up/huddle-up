import { useQuery } from '@apollo/client';
import isEqual from 'lodash.isequal';
import { useState } from 'react';
import { SearchFormVariables } from '../../../components/search-form';
import { MY_MEETINGS } from '../../../models/meetings';
import { MyMeetings, MyMeetingsVariables } from '../../../models/meetings/__generated-interfaces__/MyMeetings';
import { OrderBy } from '../../../models/__generated-interfaces__/globalTypes';

export function useMyMeetingsSearch(initialValues: SearchFormVariables, defaultOrderBy: OrderBy) {
  const [currentSearch, setCurrentSearch] = useState(initialValues);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [previousData, setPreviousData] = useState(null);

  const baseOptions = {
    startDateOrderBy: defaultOrderBy,
    offset: 0,
    limit: 5,
  };

  const { loading, error, data, refetch } = useQuery<MyMeetings, MyMeetingsVariables>(MY_MEETINGS, {
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
    await refetch({ limit: data.myMeetings.meetings.length + baseOptions.limit });
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
