/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderBy, TagOption } from "./../../__generated-interfaces__/globalTypes";

// ====================================================
// GraphQL query operation: Meetings
// ====================================================

export interface Meetings_discover_meetings_host {
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

export interface Meetings_discover_meetings_conference {
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

export interface Meetings_discover_meetings_participations_meeting {
  __typename: "Meeting";
  /**
   * The id of the meeting
   */
  id: string;
}

export interface Meetings_discover_meetings_participations_user {
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

export interface Meetings_discover_meetings_participations {
  __typename: "Participation";
  /**
   * The id of the participation
   */
  id: string;
  /**
   * The meeting associated with the participation
   */
  meeting: Meetings_discover_meetings_participations_meeting;
  /**
   * The user associated with the participation
   */
  user: Meetings_discover_meetings_participations_user;
}

export interface Meetings_discover_meetings_tags {
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

export interface Meetings_discover_meetings {
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
  host: Meetings_discover_meetings_host;
  /**
   * The conference associated with the meeting
   */
  conference: Meetings_discover_meetings_conference | null;
  /**
   * The participations of the meeting
   */
  participations: Meetings_discover_meetings_participations[];
  /**
   * The tags of the meeting
   */
  tags: Meetings_discover_meetings_tags[] | null;
}

export interface Meetings_discover {
  __typename: "MeetingSearchResponse";
  /**
   * The found meetings
   */
  meetings: Meetings_discover_meetings[];
  /**
   * The total number of meetings ignoring the pagination attributes
   */
  totalCount: number;
}

export interface Meetings {
  discover: Meetings_discover;
}

export interface MeetingsVariables {
  searchValue: string;
  startDateOrderBy: OrderBy;
  fromDate?: any | null;
  toDate?: any | null;
  tags?: TagOption[] | null;
  offset?: number | null;
  limit?: number | null;
}
