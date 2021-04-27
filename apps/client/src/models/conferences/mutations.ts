import { gql } from '@apollo/client';

export const CREATE_CONFERENCE = gql`
  mutation CreateConference($meetingId: String!) {
    createConference(createConferenceInput: { meetingId: $meetingId }) {
      id
    }
  }
`;
