import { gql } from '@apollo/client';

export const PARTICIPATION_FIELDS = gql`
  fragment ParticipationFields on Participation {
    id
    meeting {
      id
    }
    user {
      id
      name
    }
    __typename
  }
`;
