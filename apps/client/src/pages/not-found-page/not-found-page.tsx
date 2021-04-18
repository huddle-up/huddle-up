import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { LinkButton } from '../../components/link';
import { PublicPageLayout } from '../../components/public-page-layout';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
  },
  title: {
    margin: theme.spacing(4, 0),
  },
  description: {
    margin: theme.spacing(4, 0),
  },
}));

function NotFoundPage() {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <PublicPageLayout>
      <Helmet>
        <title>{t('notFoundPage.head.title')}</title>
      </Helmet>
      <Container maxWidth="sm" className={classes.container}>
        <Typography component="h1" variant="h4" className={classes.title}>
          {t('notFoundPage.title')}
        </Typography>
        <Typography component="p" className={classes.description}>
          {t('notFoundPage.description')}
        </Typography>
        <LinkButton variant="outlined" color="secondary" to="/" startIcon={<ChevronLeft />}>
          {t('notFoundPage.backLink')}
        </LinkButton>
      </Container>
    </PublicPageLayout>
  );
}

export default NotFoundPage;
