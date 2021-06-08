import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { AuthCard } from '../../components/auth-card';
import { Link } from '../../components/link';
import { useOidc } from '../../contexts/oidc';
import { ROUTES } from '../../routes';
import AuthButton from './auth-button';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    textAlign: 'center',
  },
});

function LoginPage() {
  const classes = useStyles();
  const { signInRedirect, providerInfo } = useOidc();
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('authPages.login.head.title')}</title>
      </Helmet>
      <Container maxWidth="sm" className={classes.container}>
        <AuthCard
          title={t('authPages.login.title')}
          bottom={
            <Container className={classes.bottom}>
              <Typography component="p" variant="body2" align="center">
                {t('authPages.login.switchToRegisterText')}
              </Typography>
              <Link color="secondary" to={ROUTES.auth.register}>
                {t('authPages.login.switchToRegisterLink')}
              </Link>
            </Container>
          }>
          <AuthButton
            icon={providerInfo.icon}
            label={t('authPages.login.loginWith', { with: providerInfo.name })}
            onClick={() => signInRedirect()}
          />
        </AuthCard>
      </Container>
    </>
  );
}

export default LoginPage;
