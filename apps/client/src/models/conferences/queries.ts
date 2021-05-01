import { gql } from '@apollo/client';
import { CONFERENCE_CORE_FIELDS } from './fragments';

export const CONFERENCE = gql`
  ${CONFERENCE_CORE_FIELDS}
  query Conference($id: String!) {
    conference(id: $id) {
      ...ConferenceCoreFields
    }
  }
`;

export const CONFERENCE_BY_MEETING = gql`
  ${CONFERENCE_CORE_FIELDS}
  query ConferenceByMeeting($meetingId: String!) {
    conferenceByMeeting(meetingId: $meetingId) {
      ...ConferenceCoreFields
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
