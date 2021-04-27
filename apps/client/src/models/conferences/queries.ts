import { gql } from '@apollo/client';

export const CONFERENCE = gql`
  query Conference($id: String!) {
    conference(id: $id) {
      id
      __typename
    }
  }
`;

export const CONFERENCE_BY_MEETING = gql`
  query ConferenceByMeeting($meetingId: String!) {
    conferenceByMeeting(meetingId: $meetingId) {
      id
      __typename
    }
  }
`;

export const CONFERENCE_ACCESS = gql`
  query ConferenceAccess($conferenceId: String!) {
    conferenceAccess(conferenceId: $conferenceId) {
      conferenceId
      url
    }
  }
`;
