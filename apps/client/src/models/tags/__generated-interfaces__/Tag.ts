/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Tag
// ====================================================

export interface Tag_tag {
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

export interface Tag {
  tag: Tag_tag;
}

export interface TagVariables {
  id: number;
}
