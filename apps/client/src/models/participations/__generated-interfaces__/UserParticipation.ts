/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserParticipation
// ====================================================

export interface UserParticipation_userParticipation_meeting {
  __typename: "Meeting";
  /**
   * The id of the meeting
   */
  id: string;
}

export interface UserParticipation_userParticipation_user {
  __typename: "User";
  /**
   * The id of the user
   */
  id: string;
}

export interface UserParticipation_userParticipation {
  __typename: "Participation";
  /**
   * The id of the participation
   */
  id: string;
  /**
   * The meeting associated with the participation
   */
  meeting: UserParticipation_userParticipation_meeting;
  /**
   * The user associated with the participation
   */
  user: UserParticipation_userParticipation_user;
}

export interface UserParticipation {
  userParticipation: UserParticipation_userParticipation | null;
}

export interface UserParticipationVariables {
  meetingId: string;
  userId?: string | null;
}
