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
import { TagOption } from '../../models/__generated-interfaces__/globalTypes';
import config from '../../config';
import { generateLink, ROUTES } from '../../routes';

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
    tags: [],
    maximumParticipants: config.get('rules.maxParticipants'),
  };

  async function handleCreateMeeting(meetingVariables: CreateMeetingVariables) {
    const tags: TagOption[] = meetingVariables.tags?.map((tag) => {
      return {
        id: tag.id,
        name: tag.name,
      };
    });

    await createMeeting({
      variables: { ...meetingVariables, tags },
    });
  }

  return (
    <AppPageMain noAside>
      <section>
        <SectionHeader icon={<PlayCircleOutlineIcon />} title={t('meetings.title.new')} />
        {mutationLoading && (
          <Card className={classes.card} variant="outlined">
            <Typography>Loading...</Typography>
          </Card>
        )}
        {mutationError && <p>Error... ${mutationError.message}</p>}
        {!mutationLoading && !mutationError && mutationCalled && (
          <Redirect to={generateLink(ROUTES.meetings.meeting, { id: mutationData.createMeeting.id })} />
        )}
        <CreateeMeetingForm onSubmit={handleCreateMeeting} initialValues={initialValues} />
      </section>
    </AppPageMain>
  );
}

export default MeetingCreatePage;
