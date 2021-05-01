/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PublishConference
// ====================================================

export interface PublishConference_publishConference {
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

export interface PublishConference {
  publishConference: PublishConference_publishConference;
}

export interface PublishConferenceVariables {
  conferenceId: string;
}
