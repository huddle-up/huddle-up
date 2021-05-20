/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MeetingFields
// ====================================================

export interface MeetingFields_host {
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

export interface MeetingFields_conference {
  __typename: "Conference";
  /**
   * The id of the conference
   */
  id: string;
  /**
   * The date the conference has been published to participants at
   */
  publishedAt: any | null;
  /**
   * The date the conference has been stopped at
   */
  stoppedAt: any | null;
}

export interface MeetingFields_participations_meeting {
  __typename: "Meeting";
  /**
   * The id of the meeting
   */
  id: string;
}

export interface MeetingFields_participations_user {
  __typename: "User";
  /**
   * The id of the user
   */
  id: string;
  /**
   * The name of the user
   */
  name: string;
}

export interface MeetingFields_participations {
  __typename: "Participation";
  /**
   * The id of the participation
   */
  id: string;
  /**
   * The meeting associated with the participation
   */
  meeting: MeetingFields_participations_meeting;
  /**
   * The user associated with the participation
   */
  user: MeetingFields_participations_user;
}

export interface MeetingFields_tags {
  __typename: "Tag";
  /**
   * The id of the tag
   */
  id: number;
  /**
   * The name of the tag
   */
  name: string;
}

export interface MeetingFields {
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
   * The date from which the conference can be created
   */
  prepareDate: any;
  /**
   * The maximum allowed participants of the meeting
   */
  maximumParticipants: number | null;
  /**
   * The hoster of the meeting
   */
  host: MeetingFields_host;
  /**
   * The conference associated with the meeting
   */
  conference: MeetingFields_conference | null;
  /**
   * The participations of the meeting
   */
  participations: MeetingFields_participations[];
  /**
   * The tags of the meeting
   */
  tags: MeetingFields_tags[] | null;
}
