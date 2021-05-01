import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useMutation } from '@apollo/client';
import { Redirect, useParams } from 'react-router-dom';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { Card, Typography } from '@material-ui/core';
import { Meeting, MeetingVariables } from '../../models/meetings/__generated-interfaces__/Meeting';
import { UpdateMeeting, UpdateMeetingVariables } from '../../models/meetings/__generated-interfaces__/UpdateMeeting';
import { MEETING, UPDATE_MEETING } from '../../models/meetings';
import { AppPageMain } from '../../components/app-page-layout';
import { SectionHeader } from '../../components/section-header';
import { UpdateMeetingForm } from '../../components/meeting-form';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

function MeetingUpdatePage() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { id } = useParams<MeetingVariables>();

  const { loading: queryLoading, error: queryError, data } = useQuery<Meeting>(MEETING, {
    variables: { id },
  });

  const [updateMeeting, { loading: mutationLoading, error: mutationError, called: mutationCalled }] = useMutation<
    UpdateMeeting,
    UpdateMeetingVariables
  >(UPDATE_MEETING);

  async function handleMeetingUpdate(meeting: UpdateMeetingVariables) {
    await updateMeeting({
      variables: meeting,
    });
  }

  // TODO Improve handling of loading and errors
  if (queryLoading)
    return (
      <Card className={classes.card} variant="outlined">
        <Card className={classes.card} variant="outlined">
          <Typography>Loading...</Typography>
        </Card>
      </Card>
    );
  if (queryError)
    return (
      <Card className={classes.card} variant="outlined">
        <Typography>`Error loading meeting! ${queryError.message}`</Typography>
      </Card>
    );

  return (
    <AppPageMain>
      <section>
        <SectionHeader icon={<PlayCircleOutlineIcon />} title={t('meetings.title.edit')} />
        {mutationLoading && (
          <Card className={classes.card} variant="outlined">
            <Typography>Loading...</Typography>
          </Card>
        )}
        {mutationError && (
          <Card className={classes.card} variant="outlined">
            <Typography>Error... ${mutationError.message}</Typography>
          </Card>
        )}
        {!mutationLoading && !mutationError && mutationCalled && <Redirect to={`/meetings/${id}`} />}

        <UpdateMeetingForm onSubmit={handleMeetingUpdate} initialValues={data.meeting} />
      </section>
    </AppPageMain>
  );
}

export default MeetingUpdatePage;