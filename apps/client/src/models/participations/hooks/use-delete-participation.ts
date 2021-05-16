import { useMutation } from '@apollo/client';
import { DELETE_PARTICIPATION } from '../mutations';
import { DeleteParticipation, DeleteParticipationVariables } from '../__generated-interfaces__/DeleteParticipation';

export function useDeleteParticipation() {
  const mutation = useMutation<DeleteParticipation, DeleteParticipationVariables>(DELETE_PARTICIPATION, {
    update(cache, { data: { deleteParticipation } }) {
      if (!deleteParticipation) return;
      const { meetingId, id } = deleteParticipation;
      // Remove the participation from the meeting
      cache.modify({
        id: `Meeting:${meetingId}`,
        fields: {
          participations(existing = [], { readField }) {
            return existing.filter((p) => readField('id', p) !== id);
          },
        },
      });
    },
  });
  return mutation;
}
