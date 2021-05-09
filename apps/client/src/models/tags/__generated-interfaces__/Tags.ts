/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Tags
// ====================================================

export interface Tags_tags {
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

export interface Tags {
  tags: Tags_tags[];
}
