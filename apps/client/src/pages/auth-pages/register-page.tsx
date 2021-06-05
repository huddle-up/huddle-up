import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
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

function RegisterPage() {
  const classes = useStyles();
  const { signInRedirect, providerInfo } = useOidc();
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('authPages.register.head.title')}</title>
      </Helmet>
      <Container maxWidth="sm" className={classes.container}>
        <AuthCard
          title={t('authPages.register.title')}
          top={
            <Typography component="p" variant="body1" align="center">
              {t('authPages.register.registerInfoText')}
            </Typography>
          }
          bottom={
            <Container className={classes.bottom}>
              <Typography component="p" variant="body2" align="center">
                {t('authPages.register.switchToLoginText')}
              </Typography>
              <Link color="secondary" to={ROUTES.auth.login}>
                {t('authPages.register.switchToLoginLink')}
              </Link>
            </Container>
          }>
          <AuthButton
            icon={providerInfo.icon}
            label={t('authPages.register.registerWith', { with: providerInfo.name })}
            onClick={() => signInRedirect()}
          />
        </AuthCard>
      </Container>
    </>
  );
}

export default RegisterPage;
