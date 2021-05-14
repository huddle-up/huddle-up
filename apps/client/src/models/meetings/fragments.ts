import { gql } from '@apollo/client';
import { TAG_FIELDS } from '../tags';
import { USER_CORE_FIELDS } from '../user';

export const MEETING_CORE_FIELDS = gql`
  fragment MeetingCoreFields on Meeting {
    id
    title
    description
    startDate
    endDate
    prepareDate
    __typename
  }
`;

export const MEETING_FIELDS = gql`
  ${MEETING_CORE_FIELDS}
  ${USER_CORE_FIELDS}
  ${TAG_FIELDS}
  fragment MeetingFields on Meeting {
    ...MeetingCoreFields
    host {
      ...UserCoreFields
    }
    conference {
      id
      publishedAt
      stoppedAt
      __typename
    }
    tags {
      ...TagFields
    }
  }
`;
