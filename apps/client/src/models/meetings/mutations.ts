import { gql } from '@apollo/client';
import { MEETING_FIELDS } from './fragments';

export const CREATE_MEETING = gql`
  ${MEETING_FIELDS}
  mutation CreateMeeting(
    $title: String!
    $description: String
    $startDate: DateTime!
    $endDate: DateTime!
    $tags: [TagOption!]
  ) {
    createMeeting(
      input: { title: $title, description: $description, startDate: $startDate, endDate: $endDate, tags: $tags }
    ) {
      ...MeetingFields
    }
  }
`;

export const UPDATE_MEETING = gql`
  ${MEETING_FIELDS}
  mutation UpdateMeeting(
    $id: String!
    $title: String
    $description: String
    $startDate: DateTime
    $endDate: DateTime
    $tags: [TagOption!]
  ) {
    updateMeeting(
      input: {
        id: $id
        title: $title
        description: $description
        startDate: $startDate
        endDate: $endDate
        tags: $tags
      }
    ) {
      ...MeetingFields
    }
  }
`;

// TODO is it possible to remove a meeting?
// const REMOVE_MEETING = gql`
//   mutation RemoveMeeting($id: Int) {
//     removeMeeting(id: $id)
//   }
// `;
