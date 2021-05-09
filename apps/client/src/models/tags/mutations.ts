import { gql } from '@apollo/client';
import { TAG_CORE_FIELDS } from './fragments';

export const CREATE_TAG = gql`
  ${TAG_CORE_FIELDS}
  mutation CreateTag($name: String!) {
    createTag(createTagInput: { name: $name }) {
      ...TagFields
    }
  }
`;

export const UPDATE_TAG = gql`
  ${TAG_CORE_FIELDS}
  mutation UpdateTag($id: Int!, $name: String!) {
    updateTag(updateTagInput: { id: $id, name: $name }) {
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
