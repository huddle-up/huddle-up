import { gql } from '@apollo/client';
import { MEETING_FIELDS } from './fragments';

export const MEETING = gql`
  ${MEETING_FIELDS}
  query Meeting($id: String!) {
    meeting(id: $id) {
      ...MeetingFields
    }
  }
`;

export const MEETINGS = gql`
  ${MEETING_FIELDS}
  query Meetings(
    $searchValue: String!
    $startDateOrderBy: OrderBy!
    $fromDate: DateTime
    $toDate: DateTime
    $tags: [TagOption!]
    $offset: Int
    $limit: Int
  ) {
    discover(
      input: {
        searchValue: $searchValue
        startDateOrderBy: $startDateOrderBy
        fromDate: $fromDate
        toDate: $toDate
        tags: $tags
        offset: $offset
        limit: $limit
      }
    ) {
      meetings {
        ...MeetingFields
      }
      totalCount
    }
  }
`;

export const MY_MEETINGS = gql`
  ${MEETING_FIELDS}
  query MyMeetings(
    $searchValue: String!
    $startDateOrderBy: OrderBy!
    $fromDate: DateTime
    $toDate: DateTime
    $tags: [TagOption!]
    $offset: Int
    $limit: Int
  ) {
    myMeetings(
      searchMeetingInput: {
        searchValue: $searchValue
        startDateOrderBy: $startDateOrderBy
        fromDate: $fromDate
        toDate: $toDate
        tags: $tags
        offset: $offset
        limit: $limit
      }
    ) {
      meetings {
        ...MeetingFields
      }
      totalCount
    }
  }
`;
