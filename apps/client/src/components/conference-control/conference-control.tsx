import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { PlayArrow, Stop } from '@material-ui/icons';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CREATE_CONFERENCE, PUBLISH_CONFERENCE, STOP_CONFERENCE } from '../../models/conferences';
import {
  CreateConference,
  CreateConferenceVariables,
} from '../../models/conferences/__generated-interfaces__/CreateConference';
import {
  PublishConference,
  PublishConferenceVariables,
} from '../../models/conferences/__generated-interfaces__/PublishConference';
import {
  StopConference,
  StopConferenceVariables,
} from '../../models/conferences/__generated-interfaces__/StopConference';
import { canBePublished, MEETING, MeetingState } from '../../models/meetings';
import { MeetingFields } from '../../models/meetings/__generated-interfaces__/MeetingFields';
import { UserFields } from '../../models/user/__generated-interfaces__/UserFields';
import { ConferenceJoinButton } from '../conference-join-button';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));

interface ConferenceControlProps {
  meeting: MeetingFields;
  state: MeetingState;
  user: UserFields;
}

function StartConferenceButton({ meeting, state, user }: ConferenceControlProps) {
  const { t } = useTranslation();
  const [start, { loading }] = useMutation<CreateConference, CreateConferenceVariables>(CREATE_CONFERENCE, {
    refetchQueries: [{ query: MEETING, variables: { id: meeting.id } }],
  });
  return (
    <Button
      onClick={() => start({ variables: { meetingId: meeting.id } })}
      disabled={loading}
      variant="contained"
      color="secondary"
      startIcon={loading ? <CircularProgress size="1em" /> : <PlayArrow />}>
      {t('meetings.conference.control.start')}
    </Button>
  );
}

function PublishConferenceButton({ meeting, state, user }: ConferenceControlProps) {
  const { t } = useTranslation();
  const [publish, { loading }] = useMutation<PublishConference, PublishConferenceVariables>(PUBLISH_CONFERENCE);
  const canPublish = canBePublished(meeting);
  return (
    <Grid container direction="column">
      <Button
        onClick={() => publish({ variables: { conferenceId: meeting.conference.id } })}
        disabled={loading || !canPublish}
        variant="outlined"
        color="secondary"
        startIcon={loading ? <CircularProgress size="1em" /> : <PlayArrow />}>
        {t('meetings.conference.control.publish')}
      </Button>
      {!canPublish && (
        <Typography variant="caption">{t('meetings.conference.control.publishNotYetPossible')}</Typography>
      )}
    </Grid>
  );
}

function StopConferenceButton({ meeting, state, user }: ConferenceControlProps) {
  const { t } = useTranslation();
  const [publish, { loading }] = useMutation<StopConference, StopConferenceVariables>(STOP_CONFERENCE);
  return (
    <Button
      onClick={() => publish({ variables: { conferenceId: meeting.conference.id } })}
      disabled={loading}
      variant="outlined"
      color="secondary"
      startIcon={loading ? <CircularProgress size="1em" /> : <Stop />}>
      {t('meetings.conference.control.stop')}
    </Button>
  );
}

const controlSteps = {
  start: 0,
  setup: 1,
  meet: 2,
  finished: 3,
};

function ConferenceControl({ meeting, state, user }: ConferenceControlProps) {
  const { t } = useTranslation();
  const classes = useStyles();
  const activeStep = useMemo(() => {
    if (state === MeetingState.ReadyToStart) {
      return controlSteps.start;
    }
    if (state === MeetingState.Started) {
      return controlSteps.setup;
    }
    if (state === MeetingState.Live) {
      return controlSteps.meet;
    }
    if (state === MeetingState.Stopped) {
      return controlSteps.finished;
    }
    return -1;
  }, [state]);
  return (
    <Stepper activeStep={activeStep} orientation="vertical" className={classes.root}>
      <Step completed={activeStep > controlSteps.start}>
        <StepLabel>{t('meetings.conference.control.steps.start')}</StepLabel>
        <StepContent>
          <StartConferenceButton meeting={meeting} state={state} user={user} />
        </StepContent>
      </Step>
      <Step completed={activeStep > controlSteps.setup}>
        <StepLabel>{t('meetings.conference.control.steps.setup')}</StepLabel>
        <StepContent>
          <Typography>{t('meetings.conference.control.steps.setupInfo')}</Typography>
          <Box mt={0.5}>
            <Grid container spacing={1}>
              <Grid item>{!!meeting.conference && <ConferenceJoinButton conferenceId={meeting.conference.id} />}</Grid>
              <Grid item>
                <PublishConferenceButton meeting={meeting} state={state} user={user} />
              </Grid>
            </Grid>
          </Box>
        </StepContent>
      </Step>
      <Step completed={activeStep > controlSteps.meet}>
        <StepLabel>{t('meetings.conference.control.steps.meet')}</StepLabel>
        <StepContent>
          <Typography>{t('meetings.conference.control.steps.meetInfo')}</Typography>
          <Box mt={0.5}>
            <Grid container spacing={1}>
              <Grid item>{!!meeting.conference && <ConferenceJoinButton conferenceId={meeting.conference.id} />}</Grid>
              <Grid item>
                <StopConferenceButton meeting={meeting} state={state} user={user} />
              </Grid>
            </Grid>
          </Box>
        </StepContent>
      </Step>
      <Step completed={activeStep === controlSteps.finished}>
        <StepLabel>{t('meetings.conference.control.steps.finished')}</StepLabel>
      </Step>
    </Stepper>
  );
}

export default ConferenceControl;
