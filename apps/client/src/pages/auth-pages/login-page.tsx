import { Container, makeStyles, Typography } from '@material-ui/core';
import { EmailOutlined } from '@material-ui/icons';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { AuthCard } from '../../components/auth-card';
import { Link } from '../../components/link';
import { useOidc } from '../../contexts/oidc';
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
  const oidc = useOidc();
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
              <Typography component="p" variant="body2">
                {t('authPages.login.switchToRegisterText')}
              </Typography>
              <Link color="secondary" to="/register">
                {t('authPages.login.switchToRegisterLink')}
              </Link>
            </Container>
          }>
          <AuthButton
            icon={<EmailOutlined />}
            label={t('authPages.login.loginWith', { with: 'Email' })}
            onClick={() => oidc.signInRedirect()}
          />
        </AuthCard>
      </Container>
    </>
  );
}

export default LoginPage;