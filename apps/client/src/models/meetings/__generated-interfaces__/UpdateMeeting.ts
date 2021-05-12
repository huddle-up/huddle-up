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
   * The hoster of the meeting
   */
  host: UpdateMeeting_updateMeeting_host;
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
  tags?: TagOption[] | null;
}
