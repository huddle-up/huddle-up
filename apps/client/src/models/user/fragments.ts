import { gql } from '@apollo/client';

export const USER_CORE_FIELDS = gql`
  fragment UserCoreFields on User {
    id
    email
    name
    __typename
  }
`;

export const USER_FIELDS = gql`
  ${USER_CORE_FIELDS}
  fragment UserFields on User {
    ...UserCoreFields
    biography
  }
`;
