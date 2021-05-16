/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteParticipation
// ====================================================

export interface DeleteParticipation_deleteParticipation {
  __typename: "DeleteParticipationOutput";
  /**
   * The id of the deleted participation
   */
  id: string;
  /**
   * The id of the meeting the participation belonged to
   */
  meetingId: string;
}

export interface DeleteParticipation {
  deleteParticipation: DeleteParticipation_deleteParticipation | null;
}

export interface DeleteParticipationVariables {
  id: string;
}
