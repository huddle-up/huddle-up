/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeetingConference
// ====================================================

export interface MeetingConference_meeting_conference {
  __typename: "Conference";
  /**
   * The id of the conference
   */
  id: string;
}

export interface MeetingConference_meeting {
  __typename: "Meeting";
  /**
   * The conference associated with the meeting
   */
  conference: MeetingConference_meeting_conference | null;
}

export interface MeetingConference {
  meeting: MeetingConference_meeting;
}

export interface MeetingConferenceVariables {
  id: string;
}
