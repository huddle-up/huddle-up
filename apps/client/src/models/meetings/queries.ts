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
  query Meetings($value: String!) {
    meetings(searchMeetingInput: { value: $value }) {
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

export const MY_MEETINGS = gql`
  query MyMeetings($value: String!) {
    myMeetings(searchMeetingInput: { value: $value }) {
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
