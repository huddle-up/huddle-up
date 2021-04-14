/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateMeeting
// ====================================================

export interface UpdateMeeting_updateMeeting {
  __typename: "Meeting";
  /**
   * The id of the meeting
   */
  id: number;
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
}

export interface UpdateMeeting {
  updateMeeting: UpdateMeeting_updateMeeting;
}

export interface UpdateMeetingVariables {
  id: number;
  title?: string | null;
  description?: string | null;
  startDate?: any | null;
  endDate?: any | null;
}
