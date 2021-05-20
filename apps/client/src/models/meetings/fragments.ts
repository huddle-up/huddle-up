import { gql } from '@apollo/client';
import { PARTICIPATION_FIELDS } from '../participations';
import { TAG_FIELDS } from '../tags';
import { USER_CORE_FIELDS } from '../user';

export const MEETING_CORE_FIELDS = gql`
  fragment MeetingCoreFields on Meeting {
    id
    title
    description
    startDate
    endDate
    prepareDate
    maximumParticipants
    __typename
  }
`;

export const MEETING_FIELDS = gql`
  ${MEETING_CORE_FIELDS}
  ${USER_CORE_FIELDS}
  ${TAG_FIELDS}
  ${PARTICIPATION_FIELDS}
  fragment MeetingFields on Meeting {
    ...MeetingCoreFields
    host {
      ...UserCoreFields
    }
    conference {
      id
      publishedAt
      stoppedAt
      __typename
    }
    participations {
      ...ParticipationFields
    }
    tags {
      ...TagFields
    }
  }
`;
