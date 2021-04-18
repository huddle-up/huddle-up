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

const useStyles = makeStyles((theme) => ({
  heroContent: {
    display: 'flex',
    minHeight: '100%',
    flex: '1 0',
    alignItems: 'center',
    justifyContent: 'center',
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
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {t('landingpage.title')}
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary">
              {t('landingpage.description.main')}
            </Typography>
          </Paper>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <LinkButton to="/register" variant="contained" color="primary" endIcon={<ChevronRight />}>
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
