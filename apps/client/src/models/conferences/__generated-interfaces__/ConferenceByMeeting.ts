/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ConferenceByMeeting
// ====================================================

export interface ConferenceByMeeting_conferenceByMeeting {
  __typename: "Conference";
  /**
   * The id of the conference
   */
  id: string;
  /**
   * The id of the meeting associated with the conference
   */
  meetingId: string;
  /**
   * The date the conference has been created at
   */
  createdAt: any;
  /**
   * The date the conference has been published to participants at
   */
  publishedAt: any | null;
  /**
   * The date the conference has been stopped at
   */
  stoppedAt: any | null;
}

export interface ConferenceByMeeting {
  conferenceByMeeting: ConferenceByMeeting_conferenceByMeeting | null;
}

export interface ConferenceByMeetingVariables {
  meetingId: string;
}
