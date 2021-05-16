import { gql } from '@apollo/client';
import { PARTICIPATION_FIELDS } from './fragments';

export const CREATE_PARTICIPATION = gql`
  ${PARTICIPATION_FIELDS}
  mutation CreateParticipation($meetingId: String!) {
    createParticipation(input: { meetingId: $meetingId }) {
      ...ParticipationFields
    }
  }
`;

export const DELETE_PARTICIPATION = gql`
  mutation DeleteParticipation($id: String!) {
    deleteParticipation(id: $id) {
      id
      meetingId
    }
  }
`;
