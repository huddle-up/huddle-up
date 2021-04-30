import { gql } from '@apollo/client';

export const MEETING = gql`
  query Meeting($id: String!) {
    meeting(id: $id) {
      id
      title
      description
      startDate
      endDate
      __typename
      host {
        id
        email
        name
        __typename
      }
    }
  }
`;

export const MEETINGS = gql`
  query Meetings(
    $searchValue: String!
    $startDateOrderBy: OrderBy!
    $fromDate: DateTime
    $toDate: DateTime
    $offset: Int
    $limit: Int
  ) {
    discover(
      searchMeetingInput: {
        searchValue: $searchValue
        startDateOrderBy: $startDateOrderBy
        fromDate: $fromDate
        toDate: $toDate
        offset: $offset
        limit: $limit
      }
    ) {
      meetings {
        id
        title
        description
        startDate
        endDate
        __typename
        host {
          id
          email
          name
          __typename
        }
      }
      totalCount
    }
  }
`;

export const MY_MEETINGS = gql`
  query MyMeetings(
    $searchValue: String!
    $startDateOrderBy: OrderBy!
    $fromDate: DateTime
    $toDate: DateTime
    $offset: Int
    $limit: Int
  ) {
    myMeetings(
      searchMeetingInput: {
        searchValue: $searchValue
        startDateOrderBy: $startDateOrderBy
        fromDate: $fromDate
        toDate: $toDate
        offset: $offset
        limit: $limit
      }
    ) {
      meetings {
        id
        title
        description
        startDate
        endDate
        __typename
        host {
          id
          email
          name
          __typename
        }
      }
      totalCount
    }
  }
`;
