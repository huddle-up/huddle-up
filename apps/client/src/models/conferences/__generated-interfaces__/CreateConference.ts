/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateConference
// ====================================================

export interface CreateConference_createConference {
  __typename: "Conference";
  /**
   * The id of the conference
   */
  id: string;
}

export interface CreateConference {
  createConference: CreateConference_createConference;
}

export interface CreateConferenceVariables {
  meetingId: string;
}
