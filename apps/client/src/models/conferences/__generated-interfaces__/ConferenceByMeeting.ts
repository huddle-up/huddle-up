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
}

export interface ConferenceByMeeting {
  conferenceByMeeting: ConferenceByMeeting_conferenceByMeeting | null;
}

export interface ConferenceByMeetingVariables {
  meetingId: string;
}
