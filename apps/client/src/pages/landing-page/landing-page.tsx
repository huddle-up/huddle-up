import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { PublicPageLayout } from '../../components/public-page-layout';
import { LinkButton } from '../../components/link';
import { ROUTES } from '../../routes';
import { LargeLogo } from '../../components/logo';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    display: 'flex',
    minHeight: '100%',
    flex: '1 0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(/img/landing-bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center bottom',
    padding: theme.spacing(8, 0, 6),
  },
  hiddenTitle: {
    display: 'none',
  },
  titleLogo: {
    width: theme.spacing(25),
    padding: theme.spacing(3, 0, 2),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  paper: {
    opacity: 0.8,
    backgroundColor: 'default',
    padding: theme.spacing(2),
  },
}));

function LandingPage() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <PublicPageLayout>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Paper variant="outlined" className={classes.paper}>
            <Typography component="h1" variant="body1" align="center" color="textPrimary">
              <span className={classes.hiddenTitle}>{t('landingpage.title')}</span>
              <LargeLogo className={classes.titleLogo} />
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
              {t('global.tagline.long')}
            </Typography>
          </Paper>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <LinkButton to={ROUTES.auth.register} variant="contained" color="primary" endIcon={<ChevronRight />}>
                  {t('landingpage.button.getstarted')}
                </LinkButton>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </PublicPageLayout>
  );
}

export default LandingPage;
