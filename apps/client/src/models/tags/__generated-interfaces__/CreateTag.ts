/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTag
// ====================================================

export interface CreateTag_createTag {
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

export interface CreateTag {
  createTag: CreateTag_createTag;
}

export interface CreateTagVariables {
  name: string;
}
