import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useConfig } from './contexts/config';
import { LandingPage } from './pages/landing-page';
import { MeetingsPage } from './pages/meetings';
import { NotFoundPage } from './pages/not-found-page';

function App() {
  const config = useConfig();
  const { t } = useTranslation();
  return (
    <>
      <Helmet titleTemplate="%s | HuddleUp" defaultTitle={t('global.head.title')}>
        <base href={config.get('base.host')} />
        <meta name="description" content={t('global.head.description')} />
      </Helmet>
      <Router>
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/meetings">
            <MeetingsPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
