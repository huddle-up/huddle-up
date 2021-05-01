/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MeetingHostFields
// ====================================================

export interface MeetingHostFields_host {
  __typename: "User";
  /**
   * The id of the user
   */
  id: string;
  /**
   * The email of the user
   */
  email: string;
  /**
   * The name of the user
   */
  name: string;
}

export interface MeetingHostFields {
  __typename: "Meeting";
  /**
   * The hoster of the meeting
   */
  host: MeetingHostFields_host;
}
