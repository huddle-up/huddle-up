import { gql } from '@apollo/client';

export const TAG_CORE_FIELDS = gql`
  fragment TagFields on Tag {
    id
    name
    __typename
  }
`;
