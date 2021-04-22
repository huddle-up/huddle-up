import { useQuery } from '@apollo/client';
import { CURRENT_USER } from './queries';
import { useAuth } from '../../contexts/auth';
import { CurrentUser } from './__generated-interfaces__/CurrentUser';

function useUser() {
  const { authUser } = useAuth();
  const { data, loading, error } = useQuery<CurrentUser>(CURRENT_USER, { variables: { id: authUser.userId } });
  return {
    loading,
    error,
    user: data?.user,
  };
}

export default useUser;
