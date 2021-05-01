import { gql } from '@apollo/client';

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
  fragment MeetingFields on Meeting {
    ...MeetingCoreFields
    host {
      id
      email
      name
      __typename
    }
  }
`;
