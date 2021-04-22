/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCurrentUser
// ====================================================

export interface UpdateCurrentUser_updateCurrentUser {
  __typename: "User";
  /**
   * The id of the user
   */
  id: string;
  /**
   * The name of the user
   */
  name: string;
  /**
   * The email of the user
   */
  email: string;
  /**
   * The biography of the user
   */
  biography: string | null;
}

export interface UpdateCurrentUser {
  updateCurrentUser: UpdateCurrentUser_updateCurrentUser;
}

export interface UpdateCurrentUserVariables {
  name: string;
  email: string;
  biography?: string | null;
}
