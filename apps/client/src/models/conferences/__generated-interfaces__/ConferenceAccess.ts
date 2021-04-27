/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ConferenceAccess
// ====================================================

export interface ConferenceAccess_conferenceAccess {
  __typename: "ConferenceAccess";
  /**
   * The conference the url is for
   */
  conferenceId: string;
  /**
   * The access url to join a conference
   */
  url: string;
}

export interface ConferenceAccess {
  conferenceAccess: ConferenceAccess_conferenceAccess;
}

export interface ConferenceAccessVariables {
  conferenceId: string;
}
