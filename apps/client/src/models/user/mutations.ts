import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $name: String!, $email: String!, $biography: String) {
    updateUser(updateUserInput: { id: $id, name: $name, email: $email, biography: $biography }) {
      id
      name
      email
      biography
      __typename
    }
  }
`;
