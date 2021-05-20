/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateParticipation
// ====================================================

export interface CreateParticipation_createParticipation_meeting {
  __typename: "Meeting";
  /**
   * The id of the meeting
   */
  id: string;
}

export interface CreateParticipation_createParticipation_user {
  __typename: "User";
  /**
   * The id of the user
   */
  id: string;
  /**
   * The name of the user
   */
  name: string;
}

export interface CreateParticipation_createParticipation {
  __typename: "Participation";
  /**
   * The id of the participation
   */
  id: string;
  /**
   * The meeting associated with the participation
   */
  meeting: CreateParticipation_createParticipation_meeting;
  /**
   * The user associated with the participation
   */
  user: CreateParticipation_createParticipation_user;
}

export interface CreateParticipation {
  createParticipation: CreateParticipation_createParticipation;
}

export interface CreateParticipationVariables {
  meetingId: string;
}
