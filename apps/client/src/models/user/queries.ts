import { gql } from '@apollo/client';
import { USER_FIELDS } from './fragments';

export const CURRENT_USER = gql`
  ${USER_FIELDS}
  query CurrentUser {
    currentUser {
      ...UserFields
    }
  }
`;
