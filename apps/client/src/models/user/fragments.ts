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

export const PUBLIC_USER_FIELDS = gql`
  fragment PublicUserFields on User {
    id
    name
    biography
    joinedAt
    __typename
  }
`;
