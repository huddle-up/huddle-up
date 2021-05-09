/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTag
// ====================================================

export interface UpdateTag_updateTag {
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

export interface UpdateTag {
  updateTag: UpdateTag_updateTag;
}

export interface UpdateTagVariables {
  id: number;
  name: string;
}
