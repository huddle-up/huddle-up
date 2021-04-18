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

function RegisterPage() {
  const classes = useStyles();
  const oidc = useOidc();
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
            <Typography component="p" variant="body1">
              {t('authPages.register.registerInfoText')}
            </Typography>
          }
          bottom={
            <Container className={classes.bottom}>
              <Typography component="p" variant="body2">
                {t('authPages.register.switchToLoginText')}
              </Typography>
              <Link color="secondary" to="/login">
                {t('authPages.register.switchToLoginLink')}
              </Link>
            </Container>
          }>
          <AuthButton
            icon={<EmailOutlined />}
            label={t('authPages.register.registerWith', { with: 'Email' })}
            onClick={() => oidc.signInRedirect()}
          />
        </AuthCard>
      </Container>
    </>
  );
}

export default RegisterPage;
