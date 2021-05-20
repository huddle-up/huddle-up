import { gql } from '@apollo/client';
import { PUBLIC_USER_FIELDS, USER_FIELDS } from './fragments';

export const CURRENT_USER = gql`
  ${USER_FIELDS}
  query CurrentUser {
    currentUser {
      ...UserFields
    }
  }
`;

export const USER = gql`
  ${PUBLIC_USER_FIELDS}
  query User($id: String!) {
    user(id: $id) {
      ...PublicUserFields
    }
  }
`;
