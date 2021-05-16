import { Cancel, Check } from '@material-ui/icons';
import React, { useMemo } from 'react';
import { MeetingState } from '../../models/meetings';
import { MeetingFields } from '../../models/meetings/__generated-interfaces__/MeetingFields';
import { useCreateParticipation, useDeleteParticipation } from '../../models/participations';
import { useUser } from '../../models/user';
import { SplitButton } from '../button';

interface MeetingParticipationProps {
  meeting: MeetingFields;
  state: MeetingState;
}

function useMeetingParticipation({ meeting, state }: MeetingParticipationProps) {
  const { user } = useUser();
  const userParticipation = useMemo(() => meeting.participations.find((p) => p.user.id === user.id), [meeting, user]);
  const [mutateParticipate, { loading: createLoading }] = useCreateParticipation();
  const [mutateCancel, { loading: cancelLoading }] = useDeleteParticipation();

  const participate = () => {
    mutateParticipate({ variables: { meetingId: meeting.id } });
  };
  const cancel = () => {
    mutateCancel({ variables: { id: userParticipation.id } });
  };
  return {
    isParticipant: state.isParticipant(user),
    participate,
    cancel,
    loading: createLoading || cancelLoading,
  };
}

const actionMapping = {
  participate: 0,
  cancel: 1,
};

function MeetingParticipation({ meeting, state }: MeetingParticipationProps) {
  const { isParticipant, participate, cancel, loading } = useMeetingParticipation({ meeting, state });
  const handleClick = (i: number) => {
    if (i === actionMapping.participate && !isParticipant) {
      participate();
    }
    if (i === actionMapping.cancel && isParticipant) {
      cancel();
    }
  };
  return (
    <SplitButton
      options={[isParticipant ? 'Participating' : 'Participate', 'Cancel participation']}
      icons={[<Check />, <Cancel />]}
      selectedIndex={0}
      color="secondary"
      onOptionClick={handleClick}
      variant={isParticipant ? 'contained' : 'outlined'}
      disableOptions={!isParticipant}
      loading={loading}
    />
  );
}

export default MeetingParticipation;
