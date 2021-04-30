import React from 'react';
import { Switch, Route } from 'react-router';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import MeetingCreatePage from './meeting-create-page';
import MeetingDetailPage from './meeting-detail-page';
import MeetingUpdatePage from './meeting-update-page';
import MeetingsPage from './meetings-page';
import MyMeetingsPage from './my-meetings-page';

function MeetingPages() {
  const { t } = useTranslation();

  return (
    <Switch>
      <Route path="/discover">
        <Helmet>
          <title>{t('global.title.discover')}</title>
        </Helmet>
        <MeetingsPage />
      </Route>
      <Route path="/meetings/create">
        <Helmet>
          <title>{t('meetings.head.title.create')}</title>
        </Helmet>
        <MeetingCreatePage />
      </Route>
      <Route path="/meetings/:id/edit">
        <Helmet>
          <title>{t('meetings.head.title.edit')}</title>
        </Helmet>
        <MeetingUpdatePage />
      </Route>
      <Route path="/meetings/:id">
        <Helmet>
          <title>{t('meetings.head.title.view')}</title>
        </Helmet>
        <MeetingDetailPage />
      </Route>
      <Route path="/meetings">
        <Helmet>
          <title>{t('global.title.myMeetings')}</title>
        </Helmet>
        <MyMeetingsPage />
      </Route>
    </Switch>
  );
}

export default MeetingPages;
