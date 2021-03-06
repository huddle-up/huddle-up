/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagOption } from "./../../__generated-interfaces__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateMeeting
// ====================================================

export interface UpdateMeeting_updateMeeting_host {
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

export interface UpdateMeeting_updateMeeting_conference {
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

export interface UpdateMeeting_updateMeeting_participations_meeting {
  __typename: "Meeting";
  /**
   * The id of the meeting
   */
  id: string;
}

export interface UpdateMeeting_updateMeeting_participations_user {
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

export interface UpdateMeeting_updateMeeting_participations {
  __typename: "Participation";
  /**
   * The id of the participation
   */
  id: string;
  /**
   * The meeting associated with the participation
   */
  meeting: UpdateMeeting_updateMeeting_participations_meeting;
  /**
   * The user associated with the participation
   */
  user: UpdateMeeting_updateMeeting_participations_user;
}

export interface UpdateMeeting_updateMeeting_tags {
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

export interface UpdateMeeting_updateMeeting {
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
   * The date on which the meeting has been canceled
   */
  canceledOn: any | null;
  /**
   * The maximum allowed participants of the meeting
   */
  maximumParticipants: number | null;
  /**
   * The hoster of the meeting
   */
  host: UpdateMeeting_updateMeeting_host;
  /**
   * The conference associated with the meeting
   */
  conference: UpdateMeeting_updateMeeting_conference | null;
  /**
   * The participations of the meeting
   */
  participations: UpdateMeeting_updateMeeting_participations[];
  /**
   * The tags of the meeting
   */
  tags: UpdateMeeting_updateMeeting_tags[] | null;
}

export interface UpdateMeeting {
  updateMeeting: UpdateMeeting_updateMeeting;
}

export interface UpdateMeetingVariables {
  id: string;
  title?: string | null;
  description?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  tags: TagOption[];
  maximumParticipants?: number | null;
}
