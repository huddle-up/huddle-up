import { gql } from '@apollo/client';

export const CREATE_MEETING = gql`
  mutation CreateMeeting($title: String!, $description: String, $startDate: DateTime!, $endDate: DateTime!) {
    createMeeting(
      createMeetingInput: { title: $title, description: $description, startDate: $startDate, endDate: $endDate }
    ) {
      id
      title
      description
      startDate
      endDate
      __typename
    }
  }
`;

export const UPDATE_MEETING = gql`
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
      id
      title
      description
      startDate
      endDate
      __typename
    }
  }
`;

// TODO is it possible to remove a meeting?
// const REMOVE_MEETING = gql`
//   mutation RemoveMeeting($id: Int) {
//     removeMeeting(id: $id)
//   }
// `;
