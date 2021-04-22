import { gql } from '@apollo/client';

export const UPDATE_CURRENT_USER = gql`
  mutation UpdateCurrentUser($name: String!, $email: String!, $biography: String) {
    updateCurrentUser(updateCurrentUserInput: { name: $name, email: $email, biography: $biography }) {
      id
      name
      email
      biography
      __typename
    }
  }
`;
