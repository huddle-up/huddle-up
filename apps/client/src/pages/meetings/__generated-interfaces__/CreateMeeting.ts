/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateMeeting
// ====================================================

export interface CreateMeeting_createMeeting_user {
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

export interface CreateMeeting_createMeeting {
  __typename: "Meeting";
  /**
   * The id of the meeting
   */
  id: string;
  /**
   * The title of the meeting
   */
  title: string;
  /**
   * The description of the meeting
   */
  description: string | null;
  /**
   * The start date of the meeting
   */
  startDate: any;
  /**
   * The end date of the meeting
   */
  endDate: any;
  /**
   * The hoster of the meeting
   */
  user: CreateMeeting_createMeeting_user;
}

export interface CreateMeeting {
  createMeeting: CreateMeeting_createMeeting;
}

export interface CreateMeetingVariables {
  title: string;
  description?: string | null;
  startDate: any;
  endDate: any;
  userId: string;
}
