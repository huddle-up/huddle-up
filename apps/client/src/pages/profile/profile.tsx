import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router';
import { AppPageAside, AppPageMain } from '../../components/app-page-layout';
import ProfileNav from './profile-nav';
import ProfilePage from './profile-page';

function Profile() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('profile.head.title')}</title>
      </Helmet>
      <AppPageAside>
        <ProfileNav />
      </AppPageAside>
      <AppPageMain>
        <Switch>
          <Route path="/profile" exact>
            <ProfilePage />
          </Route>
        </Switch>
      </AppPageMain>
    </>
  );
}

export default Profile;
