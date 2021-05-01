import { gql } from '@apollo/client';
import { CONFERENCE_CORE_FIELDS } from './fragments';

export const CREATE_CONFERENCE = gql`
  ${CONFERENCE_CORE_FIELDS}
  mutation CreateConference($meetingId: String!) {
    createConference(createConferenceInput: { meetingId: $meetingId }) {
      ...ConferenceCoreFields
    }
  }
`;

export const PUBLISH_CONFERENCE = gql`
  ${CONFERENCE_CORE_FIELDS}
  mutation PublishConference($conferenceId: String!) {
    publishConference(conferenceId: $conferenceId) {
      ...ConferenceCoreFields
    }
  }
`;

export const STOP_CONFERENCE = gql`
  ${CONFERENCE_CORE_FIELDS}
  mutation StopConference($conferenceId: String!) {
    stopConference(conferenceId: $conferenceId) {
      ...ConferenceCoreFields
    }
  }
`;
