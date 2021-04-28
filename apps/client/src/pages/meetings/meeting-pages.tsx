import React from 'react';
import { Switch, Route } from 'react-router';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import MeetingCreate from './meeting-create';
import MeetingDetail from './meeting-detail';
import MeetingUpdate from './meeting-update';
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
        <MeetingCreate />
      </Route>
      <Route path="/meetings/:id/edit">
        <Helmet>
          <title>{t('meetings.head.title.edit')}</title>
        </Helmet>
        <MeetingUpdate />
      </Route>
      <Route path="/meetings/:id">
        <Helmet>
          <title>{t('meetings.head.title.view')}</title>
        </Helmet>
        <MeetingDetail />
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
