import { gql } from '@apollo/client';

export const CONFERENCE_CORE_FIELDS = gql`
  fragment ConferenceCoreFields on Conference {
    id
    meetingId
    createdAt
    publishedAt
    stoppedAt
    __typename
  }
`;
