/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_user {
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
  /**
   * The biography of the user
   */
  biography: string | null;
}

export interface CurrentUser {
  user: CurrentUser_user;
}

export interface CurrentUserVariables {
  id: string;
}
