import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/client';
import { Redirect, useParams } from 'react-router-dom';
import { Cancel, Info, PlayCircleOutline } from '@material-ui/icons';
import { Meeting, MeetingVariables } from '../../models/meetings/__generated-interfaces__/Meeting';
import { UpdateMeeting, UpdateMeetingVariables } from '../../models/meetings/__generated-interfaces__/UpdateMeeting';
import { isHost, MEETING, MeetingState, UPDATE_MEETING, useWatchMeetingState } from '../../models/meetings';
import { AppPageMain } from '../../components/app-page-layout';
import { SectionHeader } from '../../components/section-header';
import { CancelMeetingForm, UpdateMeetingForm } from '../../components/meeting-form';
import { TagOption } from '../../models/__generated-interfaces__/globalTypes';
import { Breadcrumbs } from '../../components/breadcrumbs';
import { Link } from '../../components/link';
import { generateLink, ROUTES } from '../../routes';
import { ErrorCard } from '../../components/error';
import { LoadingContent } from '../../components/loading';
import { useUser } from '../../models/user';

function InfoCard({ text }: { text: string }) {
  return (
    <Box mb={2}>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={1}>
            <Grid item>
              <Info color="disabled" />
            </Grid>
            <Grid item>
              <Typography component="p">{text}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

function MeetingUpdatePage() {
  const { t } = useTranslation();
  const { id } = useParams<MeetingVariables>();
  const { user } = useUser();

  const { loading: queryLoading, error: queryError, data } = useQuery<Meeting>(MEETING, {
    variables: { id },
  });

  const [updateMeeting, { loading: mutationLoading, error: mutationError, called: mutationCalled }] = useMutation<
    UpdateMeeting,
    UpdateMeetingVariables
  >(UPDATE_MEETING);

  const meetingState = useWatchMeetingState(data?.meeting, user);
  const canEdit = [MeetingState.Future, MeetingState.ReadyToStart].includes(meetingState);

  async function handleMeetingUpdate(meetingVariables: UpdateMeetingVariables) {
    const tags: TagOption[] = meetingVariables.tags?.map((tag) => {
      return {
        id: tag.id,
        name: tag.name,
      };
    });

    await updateMeeting({
      variables: { ...meetingVariables, tags },
    });
  }

  if (queryLoading) return <LoadingContent />;

  if (queryError) {
    return (
      <AppPageMain noAside noMarginTop>
        <ErrorCard isInline={false} detail={queryError.message} />
      </AppPageMain>
    );
  }

  const { meeting } = data;
  if (!isHost(user, meeting)) return <Redirect to={ROUTES.meetings.myMeetings} />;

  return (
    <>
      <Breadcrumbs noAside>
        <Link to={ROUTES.meetings.myMeetings}>&lt; {t('global.title.myMeetings')}</Link>
        <Link to={generateLink(ROUTES.meetings.meeting, { id })}>{t('global.title.meetingDetails')}</Link>
      </Breadcrumbs>
      <AppPageMain noAside noMarginTop>
        <section>
          <SectionHeader icon={<PlayCircleOutline />} title={t('meetings.title.edit')} />
          {mutationLoading && <LoadingContent />}
          {mutationError && <ErrorCard detail={mutationError.message} />}
          {!mutationLoading && !mutationError && mutationCalled && <Redirect to={`/meetings/${id}`} />}

          {!canEdit && <InfoCard text={t('meetings.form.noMoreUpdate')} />}
          <UpdateMeetingForm onSubmit={handleMeetingUpdate} initialValues={meeting} disabled={!canEdit} />
        </section>
        <section>
          <SectionHeader icon={<Cancel />} title={t('meetings.cancel.title')} />
          {canEdit ? <CancelMeetingForm meeting={meeting} /> : <InfoCard text={t('meetings.cancel.noMore')} />}
        </section>
      </AppPageMain>
    </>
  );
}

export default MeetingUpdatePage;
