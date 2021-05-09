import { gql } from '@apollo/client';
import { TAG_CORE_FIELDS } from './fragments';

export const TAG = gql`
  ${TAG_CORE_FIELDS}
  query Tag($id: Int!) {
    tag(id: $id) {
      ...TagFields
    }
  }
`;

export const TAGS = gql`
  ${TAG_CORE_FIELDS}
  query Tags {
    tags {
      ...TagFields
    }
  }
`;
