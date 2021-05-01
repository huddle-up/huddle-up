import { gql } from '@apollo/client';
import { MEETING_CORE_FIELDS } from './fragments';

export const CREATE_MEETING = gql`
  ${MEETING_CORE_FIELDS}
  mutation CreateMeeting($title: String!, $description: String, $startDate: DateTime!, $endDate: DateTime!) {
    createMeeting(
      createMeetingInput: { title: $title, description: $description, startDate: $startDate, endDate: $endDate }
    ) {
      ...MeetingCoreFields
    }
  }
`;

export const UPDATE_MEETING = gql`
  ${MEETING_CORE_FIELDS}
  mutation UpdateMeeting($id: String!, $title: String, $description: String, $startDate: DateTime, $endDate: DateTime) {
    updateMeeting(
      updateMeetingInput: {
        id: $id
        title: $title
        description: $description
        startDate: $startDate
        endDate: $endDate
      }
    ) {
      ...MeetingCoreFields
    }
  }
`;

// TODO is it possible to remove a meeting?
// const REMOVE_MEETING = gql`
//   mutation RemoveMeeting($id: Int) {
//     removeMeeting(id: $id)
//   }
// `;
