/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderBy, TagOption } from "./../../__generated-interfaces__/globalTypes";

// ====================================================
// GraphQL query operation: MyMeetings
// ====================================================

export interface MyMeetings_myMeetings_meetings_host {
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

export interface MyMeetings_myMeetings_meetings_conference {
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

export interface MyMeetings_myMeetings_meetings_tags {
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

export interface MyMeetings_myMeetings_meetings {
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
   * The hoster of the meeting
   */
  host: MyMeetings_myMeetings_meetings_host;
  /**
   * The conference associated with the meeting
   */
  conference: MyMeetings_myMeetings_meetings_conference | null;
  /**
   * The tags of the meeting
   */
  tags: MyMeetings_myMeetings_meetings_tags[] | null;
}

export interface MyMeetings_myMeetings {
  __typename: "MeetingSearchResponse";
  /**
   * The found meetings
   */
  meetings: MyMeetings_myMeetings_meetings[];
  /**
   * The total number of meetings ignoring the pagination attributes
   */
  totalCount: number;
}

export interface MyMeetings {
  myMeetings: MyMeetings_myMeetings;
}

export interface MyMeetingsVariables {
  searchValue: string;
  startDateOrderBy: OrderBy;
  fromDate?: any | null;
  toDate?: any | null;
  tags?: TagOption[] | null;
  offset?: number | null;
  limit?: number | null;
}
