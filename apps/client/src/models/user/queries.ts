import { gql } from '@apollo/client';

export const CURRENT_USER = gql`
  query CurrentUser($id: String!) {
    user(id: $id) {
      id
      email
      name
      biography
      __typename
    }
  }
`;
