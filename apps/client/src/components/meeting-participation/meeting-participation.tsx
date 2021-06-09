import { Cancel, CheckCircle, CheckCircleOutline } from '@material-ui/icons';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isHost, isInPast, isParticipant, isStopped, MeetingState } from '../../models/meetings';
import { MeetingFields } from '../../models/meetings/__generated-interfaces__/MeetingFields';
import { useCreateParticipation, useDeleteParticipation } from '../../models/participations';
import { useUser } from '../../models/user';
import { SplitButton } from '../button';

interface MeetingParticipationProps {
  meeting: MeetingFields;
  state: MeetingState;
}

function useMeetingParticipation({ meeting }: MeetingParticipationProps) {
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
  const loading = createLoading || cancelLoading;
  return {
    isParticipating: isParticipant(user, meeting),
    participate,
    cancel,
    loading,
    hide: isHost(user, meeting) || isStopped(meeting) || isInPast(meeting),
  };
}

const actionMapping = {
  participate: 0,
  cancel: 1,
};

function MeetingParticipation({ meeting, state }: MeetingParticipationProps) {
  const { t } = useTranslation();
  const { isParticipating, participate, cancel, loading, hide } = useMeetingParticipation({ meeting, state });
  const disableButton =
    !isParticipating && meeting.maximumParticipants && meeting.maximumParticipants <= meeting.participations.length;
  const handleClick = (i: number) => {
    if (i === actionMapping.participate && !isParticipating) {
      participate();
    }
    if (i === actionMapping.cancel && isParticipating) {
      cancel();
    }
  };

  if (hide) {
    return null;
  }

  return (
    <SplitButton
      options={[
        isParticipating ? t('meetings.participation.participating') : t('meetings.participation.participate'),
        t('meetings.participation.doNotParticipate'),
      ]}
      icons={[isParticipating ? <CheckCircle /> : <CheckCircleOutline />, <Cancel />]}
      selectedIndex={0}
      color="secondary"
      onOptionClick={handleClick}
      variant={isParticipating ? 'contained' : 'outlined'}
      disableOptions={!isParticipating}
      loading={loading}
      disableButton={disableButton}
    />
  );
}

export default MeetingParticipation;
