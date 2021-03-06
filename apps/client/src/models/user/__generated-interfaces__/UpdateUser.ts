/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateCurrentUser {
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

export interface UpdateUser {
  updateCurrentUser: UpdateUser_updateCurrentUser;
}

export interface UpdateUserVariables {
  name: string;
  email: string;
  biography?: string | null;
}
