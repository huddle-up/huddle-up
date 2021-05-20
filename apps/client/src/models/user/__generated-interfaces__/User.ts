/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user {
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
   * The biography of the user
   */
  biography: string | null;
  /**
   * The join date of the user
   */
  joinedAt: any;
}

export interface User {
  user: User_user;
}

export interface UserVariables {
  id: string;
}
