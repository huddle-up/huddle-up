import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { Redirect } from 'react-router';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { Card, Typography } from '@material-ui/core';
import { CreateMeeting, CreateMeetingVariables } from '../../models/meetings/__generated-interfaces__/CreateMeeting';
import { CREATE_MEETING } from '../../models/meetings';
import { AppPageMain } from '../../components/app-page-layout';
import { SectionHeader } from '../../components/section-header';
import { CreateeMeetingForm } from '../../components/meeting-form';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

function MeetingCreatePage() {
  const { t } = useTranslation();
  const classes = useStyles();

  const [
    createMeeting,
    { loading: mutationLoading, error: mutationError, called: mutationCalled, data: mutationData },
  ] = useMutation<CreateMeeting>(CREATE_MEETING, {
    refetchQueries: ['Meetings', 'MyMeetings'],
  });

  const endDate = new Date();
  endDate.setHours(endDate.getHours() + 1);
  const initialValues = {
    title: '',
    description: '',
    startDate: new Date().toUTCString(),
    endDate: endDate.toUTCString(),
  };

  async function handleCreateMeeting(meeting: CreateMeetingVariables) {
    await createMeeting({
      variables: meeting,
    });
  }

  return (
    <AppPageMain>
      <section>
        <SectionHeader icon={<PlayCircleOutlineIcon />} title={t('meetings.title.new')} />
        {mutationLoading && (
          <Card className={classes.card} variant="outlined">
            <Typography>Loading...</Typography>
          </Card>
        )}
        {mutationError && <p>Error... ${mutationError.message}</p>}
        {!mutationLoading && !mutationError && mutationCalled && (
          <Redirect to={`/meetings/${mutationData.createMeeting.id}`} />
        )}
        <CreateeMeetingForm onSubmit={handleCreateMeeting} initialValues={initialValues} />
      </section>
    </AppPageMain>
  );
}

export default MeetingCreatePage;