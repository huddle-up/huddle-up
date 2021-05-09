import { useQuery } from '@apollo/client';
import { TAGS } from '../../models/tags';
import { Tags } from '../../models/tags/__generated-interfaces__/Tags';
import { TagOption } from '../../models/__generated-interfaces__/globalTypes';

function useTagsQuery() {
  const { loading: queryLoading, error: queryError, data } = useQuery<Tags>(TAGS);
  const tagOptions: TagOption[] = data ? data.tags : [];

  return {
    queryLoading,
    queryError,
    tagOptions,
  };
}

export default useTagsQuery;
