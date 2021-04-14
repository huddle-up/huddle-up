/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Meetings
// ====================================================

export interface Meetings_meetings {
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

export interface Meetings {
  meetings: Meetings_meetings[];
}
