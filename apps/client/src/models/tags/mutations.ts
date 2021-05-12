import { gql } from '@apollo/client';
import { TAG_FIELDS } from './fragments';

export const CREATE_TAG = gql`
  ${TAG_FIELDS}
  mutation CreateTag($name: String!) {
    createTag(input: { name: $name }) {
      ...TagFields
    }
  }
`;

export const UPDATE_TAG = gql`
  ${TAG_FIELDS}
  mutation UpdateTag($id: Int!, $name: String!) {
    updateTag(input: { id: $id, name: $name }) {
      ...TagFields
    }
  }
`;

// TODO is it possible to remove a tag?
// const REMOVE_TAG = gql`
//   mutation RemoveTag($id: Int) {
//     removeTag(id: $id)
//   }
// `;
