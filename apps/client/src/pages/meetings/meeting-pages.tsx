import React from 'react';
import { Switch, Route } from 'react-router';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import MeetingCreatePage from './meeting-create-page';
import MeetingDetailPage from './meeting-detail-page';
import MeetingUpdatePage from './meeting-update-page';
import MeetingsPage from './meetings-page';
import MyMeetingsPage from './my-meetings-page';
import { ROUTES } from '../../routes';

function MeetingPages() {
  const { t } = useTranslation();

  return (
    <Switch>
      <Route path={ROUTES.meetings.discoverMeeting}>
        <Helmet>
          <title>{t('meetings.head.title.view')}</title>
        </Helmet>
        <MeetingDetailPage />
      </Route>
      <Route path={ROUTES.meetings.discover}>
        <Helmet>
          <title>{t('global.title.discover')}</title>
        </Helmet>
        <MeetingsPage />
      </Route>
      <Route path={ROUTES.meetings.create}>
        <Helmet>
          <title>{t('meetings.head.title.create')}</title>
        </Helmet>
        <MeetingCreatePage />
      </Route>
      <Route path={ROUTES.meetings.edit}>
        <Helmet>
          <title>{t('meetings.head.title.edit')}</title>
        </Helmet>
        <MeetingUpdatePage />
      </Route>
      <Route path={ROUTES.meetings.meeting}>
        <Helmet>
          <title>{t('meetings.head.title.view')}</title>
        </Helmet>
        <MeetingDetailPage />
      </Route>
      <Route path={ROUTES.meetings.myMeetings}>
        <Helmet>
          <title>{t('global.title.myMeetings')}</title>
        </Helmet>
        <MyMeetingsPage />
      </Route>
    </Switch>
  );
}

export default MeetingPages;
