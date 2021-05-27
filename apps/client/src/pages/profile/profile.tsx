import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router';
import { AppPageAside, AppPageMain } from '../../components/app-page-layout';
import { ROUTES } from '../../routes';
import ProfileNav from './profile-nav';
import ProfilePage from './profile-page';
import PublicProfilePage from './public-profile-page';

function Profile() {
  const { t } = useTranslation();
  return (
    <>
      <AppPageAside>
        <ProfileNav />
      </AppPageAside>
      <AppPageMain>
        <Switch>
          <Route path={ROUTES.profile.publicProfile}>
            <Helmet>
              <title>{t('profile.head.publicProfile')}</title>
            </Helmet>
            <PublicProfilePage />
          </Route>
          <Route path={ROUTES.profile.profile} exact>
            <Helmet>
              <title>{t('profile.head.title')}</title>
            </Helmet>
            <ProfilePage />
          </Route>
        </Switch>
      </AppPageMain>
    </>
  );
}

export default Profile;
