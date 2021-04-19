import React from 'react';
import { Switch, Route } from 'react-router';
import { AppPageLayout } from '../../components/app-page-layout';
import MeetingCreate from './meeting-create';
import MeetingDetail from './meeting-detail';
import MeetingUpdate from './meeting-update';
import MeetingsPage from './meetings-page';

function MeetingPages() {
  return (
    <AppPageLayout>
      <Switch>
        <Route path="/meetings/create">
          <MeetingCreate />
        </Route>
        <Route path="/meetings/:id/edit">
          <MeetingUpdate />
        </Route>
        <Route path="/meetings/:id">
          <MeetingDetail />
        </Route>
        <Route path="/meetings">
          <MeetingsPage />
        </Route>
      </Switch>
    </AppPageLayout>
  );
}

export default MeetingPages;
