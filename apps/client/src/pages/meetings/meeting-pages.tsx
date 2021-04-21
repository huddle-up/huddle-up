import React from 'react';
import { Switch, Route } from 'react-router';
import MeetingCreate from './meeting-create';
import MeetingDetail from './meeting-detail';
import MeetingUpdate from './meeting-update';
import MeetingsPage from './meetings-page';
import MyMeetingsPage from './my-meetings-page';

function MeetingPages() {
  return (
    <Switch>
      <Route path="/discover">
        <MeetingsPage />
      </Route>
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
        <MyMeetingsPage />
      </Route>
    </Switch>
  );
}

export default MeetingPages;
