import { useMutation } from '@apollo/client';
import { PARTICIPATION_FIELDS } from '../fragments';
import { CREATE_PARTICIPATION } from '../mutations';
import { CreateParticipation, CreateParticipationVariables } from '../__generated-interfaces__/CreateParticipation';

export function useCreateParticipation() {
  const mutation = useMutation<CreateParticipation, CreateParticipationVariables>(CREATE_PARTICIPATION, {
    update(cache, { data: { createParticipation } }) {
      cache.modify({
        id: `Meeting:${createParticipation.meeting.id}`,
        fields: {
          participations(existing = [], { readField }) {
            const newParticipationRef = cache.writeFragment({
              data: createParticipation,
              fragment: PARTICIPATION_FIELDS,
            });
            if (existing.some((ref) => readField('id', ref) === createParticipation.id)) {
              return existing;
            }
            return [...existing, newParticipationRef];
          },
        },
      });
    },
  });
  return mutation;
}
