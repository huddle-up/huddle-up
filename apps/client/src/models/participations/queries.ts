import { gql } from '@apollo/client';
import { PARTICIPATION_FIELDS } from './fragments';

export const USER_PARTICIPATION = gql`
  ${PARTICIPATION_FIELDS}
  query UserParticipation($meetingId: String!, $userId: String) {
    userParticipation(meetingId: $meetingId, userId: $userId) {
      ...ParticipationFields
    }
  }
`;
