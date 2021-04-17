import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch } from 'react-router';
import LoginPage from './login-page';
import { LoginCallbackPage } from './login-callback-page';
import RegisterPage from './register-page';
import { PublicPageLayout } from '../../components/page-layout';
import { OidcProvider } from '../../contexts/oidc';
import { useAuth } from '../../contexts/auth';
import { LargeLogo } from '../../components/logo';
import { Link } from '../../components/link';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: '1 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    textAlign: 'center',
    margin: theme.spacing(8, 0),
  },
  logo: {
    width: 120,
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  bottom: {
    textAlign: 'center',
    marginTop: theme.spacing(9),
  },
}));

function AuthPages() {
  const { loggedIn } = useAuth();
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <OidcProvider>
      {loggedIn && <Redirect to="/meetings" />}
      <PublicPageLayout header={<></>}>
        <Container className={classes.root}>
          <Container className={classes.logoContainer}>
            <LargeLogo className={classes.logo} />
          </Container>
          <Switch>
            <Route path="/login" exact>
              <LoginPage />
            </Route>
            <Route path="/login/callback">
              <LoginCallbackPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
          <Container className={classes.bottom}>
            <Link color="secondary" to="/">
              {t('authPages.backToHome')}
            </Link>
          </Container>
        </Container>
      </PublicPageLayout>
    </OidcProvider>
  );
}

export default AuthPages;
