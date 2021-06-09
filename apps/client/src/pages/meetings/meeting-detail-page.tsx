import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { matchPath, useLocation, useParams } from 'react-router-dom';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { Meeting, MeetingVariables } from '../../models/meetings/__generated-interfaces__/Meeting';
import { MeetingDetailCard } from '../../components/meeting';
import { MEETING } from '../../models/meetings';
import { AppPageMain } from '../../components/app-page-layout';
import { SectionHeader } from '../../components/section-header';
import { Breadcrumbs } from '../../components/breadcrumbs';
import { Link } from '../../components/link';
import { ROUTES } from '../../routes';
import { ErrorCard } from '../../components/error';
import { LoadingContent } from '../../components/loading';

function MeetingDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<MeetingVariables>();
  const location = useLocation();

  const matches = (path: string) => {
    const match = matchPath(location.pathname, {
      path,
    });
    return match !== null;
  };

  const { loading: queryLoading, error: queryError, data, startPolling, stopPolling } = useQuery<Meeting>(MEETING, {
    variables: { id },
  });

  useEffect(() => {
    startPolling(5000);
    return () => stopPolling();
    // eslint-disable-next-line
  }, []);

  if (queryLoading) return <LoadingContent />;

  if (queryError) {
    return (
      <AppPageMain noAside noMarginTop>
        <ErrorCard isInline={false} detail={queryError.message} />
      </AppPageMain>
    );
  }

  return (
    <>
      <Breadcrumbs noAside>
        {matches(ROUTES.meetings.meeting) && (
          <Link to={ROUTES.meetings.myMeetings}>&lt; {t('global.title.myMeetings')}</Link>
        )}
        {matches(ROUTES.meetings.allMeetingsMeeting) && (
          <Link to={ROUTES.meetings.allMeetings}>&lt; {t('global.title.allMeetings')}</Link>
        )}
      </Breadcrumbs>
      <AppPageMain noAside noMarginTop>
        <section>
          <SectionHeader icon={<PlayCircleOutlineIcon />} title={t('global.title.meeting')} />
          <MeetingDetailCard meeting={data.meeting} />
        </section>
      </AppPageMain>
    </>
  );
}

export default MeetingDetailPage;
