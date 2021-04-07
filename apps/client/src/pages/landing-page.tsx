import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  mainContent: {
    backgroundImage: 'url(https://source.unsplash.com/960x400/daily?meeting,social)',
    [theme.breakpoints.up('md')]: {
      backgroundImage: 'url(https://source.unsplash.com/1280x720/daily?meeting,social)',
    },
    [theme.breakpoints.up('lg')]: {
      backgroundImage: 'url(https://source.unsplash.com/1920x1080/daily?meeting,social)',
    },
    [theme.breakpoints.up('xl')]: {
      backgroundImage: 'url(https://source.unsplash.com/2560x1440/daily?meeting,social)',
    },
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(8, 0, 6),
  },
  mainButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
  },
  link: {
    margin: theme.spacing(1, 1.5),
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
    <>
      <Helmet>
        <title>{t('landingpage.head.title')}</title>
        <meta name="description" content={t('landingpage.head.description')} />
      </Helmet>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" className={classes.toolbarTitle}>
            HuddleUp
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              {t('button.login')}
            </Link>
          </nav>
          <Button href="#" color="primary" variant="outlined" className={classes.link}>
            {t('button.register')}
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.mainContent}>
          <Container maxWidth="sm">
            <Paper variant="outlined" className={classes.paper}>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                {t('landingpage.title')}
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary">
                {t('landingpage.description.main')}
              </Typography>
            </Paper>
            <div className={classes.mainButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" endIcon={<ArrowForwardIosIcon />}>
                    {t('button.getstarted')}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
            {t('landingpage.description.footer')}
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary">
            {t('landingpage.description.short')}{' '}
            <Link href="#" variant="body2">
              {t('link.help')}
            </Link>
          </Typography>
        </Container>
      </footer>
    </>
  );
}

export default LandingPage;
