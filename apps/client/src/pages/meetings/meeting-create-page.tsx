import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { Redirect } from 'react-router';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { CreateMeeting, CreateMeetingVariables } from '../../models/meetings/__generated-interfaces__/CreateMeeting';
import { CREATE_MEETING } from '../../models/meetings';
import { AppPageMain } from '../../components/app-page-layout';
import { SectionHeader } from '../../components/section-header';
import { CreateeMeetingForm } from '../../components/meeting-form';
import { TagOption } from '../../models/__generated-interfaces__/globalTypes';
import config from '../../config';
import { generateLink, ROUTES } from '../../routes';
import { Breadcrumbs } from '../../components/breadcrumbs';
import { Link } from '../../components/link';
import { ErrorCard } from '../../components/error';
import { LoadingContent } from '../../components/loading';

function MeetingCreatePage() {
  const { t } = useTranslation();

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
    <>
      <Breadcrumbs noAside>
        <Link to={ROUTES.meetings.myMeetings}>&lt; {t('global.title.myMeetings')}</Link>
      </Breadcrumbs>
      <AppPageMain noAside noMarginTop>
        <section>
          <SectionHeader icon={<PlayCircleOutlineIcon />} title={t('meetings.title.new')} />
          {mutationLoading && <LoadingContent />}
          {mutationError && <ErrorCard detail={mutationError.message} />}
          {!mutationLoading && !mutationError && mutationCalled && (
            <Redirect to={generateLink(ROUTES.meetings.meeting, { id: mutationData.createMeeting.id })} />
          )}
          <CreateeMeetingForm onSubmit={handleCreateMeeting} initialValues={initialValues} />
        </section>
      </AppPageMain>
    </>
  );
}

export default MeetingCreatePage;
