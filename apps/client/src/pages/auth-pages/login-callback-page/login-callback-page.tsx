import React from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress, Container, makeStyles, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { LinkButton } from '../../../components/link';
import { useLoginCallbackPage } from './use-login-callback-page';
import { ROUTES } from '../../../routes';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(4),
  },
  error: {
    margin: theme.spacing(2, 0),
  },
}));

function LoginCallbackPage() {
  const { hasError, isLoading } = useLoginCallbackPage();
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.container}>
      {!isLoading && hasError ? (
        <>
          <Typography component="p" variant="body1" className={classes.error}>
            {t('authPages.callback.error')}
          </Typography>
          <LinkButton variant="contained" color="secondary" to={ROUTES.auth.login} startIcon={<ChevronLeft />}>
            {t('authPages.callback.backToLogin')}
          </LinkButton>
        </>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </Container>
  );
}

export default LoginCallbackPage;
