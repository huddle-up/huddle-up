/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ParticipationFields
// ====================================================

export interface ParticipationFields_meeting {
  __typename: "Meeting";
  /**
   * The id of the meeting
   */
  id: string;
}

export interface ParticipationFields_user {
  __typename: "User";
  /**
   * The id of the user
   */
  id: string;
}

export interface ParticipationFields {
  __typename: "Participation";
  /**
   * The id of the participation
   */
  id: string;
  /**
   * The meeting associated with the participation
   */
  meeting: ParticipationFields_meeting;
  /**
   * The user associated with the participation
   */
  user: ParticipationFields_user;
}
