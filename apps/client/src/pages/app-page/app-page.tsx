import React from 'react';
import { Route, Switch } from 'react-router';
import { AppPageLayout } from '../../components/app-page-layout';
import { useUser } from '../../models/user';
import { MeetingPages } from '../meetings';
import { Profile } from '../profile';

function AppPage() {
  const { loading: userLoading } = useUser();
  if (userLoading) {
    return null;
  }
  return (
    <AppPageLayout>
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/(meetings|discover)">
          <MeetingPages />
        </Route>
      </Switch>
    </AppPageLayout>
  );
}

export default AppPage;
