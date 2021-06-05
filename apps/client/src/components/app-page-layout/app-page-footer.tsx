import React from 'react';
import { Link, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2, 3),
    marginTop: 'auto',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  tagline: {
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      marginBottom: 0,
    },
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > a': {
      padding: theme.spacing(0, 1),
      textDecoration: 'underline',
    },
  },
}));

function AppPageFooter() {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <footer className={classes.footer}>
      <div className={classes.tagline}>
        <Typography component="span" variant="subtitle1" align="center" color="textSecondary">
          {t('global.tagline.short')}
        </Typography>
      </div>
      <div className={classes.links}>
        <Link
          href="https://huddle-up.github.io/handbook/docs/use/intro/"
          target="_BLANK"
          rel="noopener noreferrer"
          variant="body2">
          {t('global.link.help')}
        </Link>
        <Link href="https://huddle-up.github.io/handbook" target="_BLANK" rel="noopener noreferrer" variant="body2">
          {t('global.link.about')}
        </Link>
      </div>
    </footer>
  );
}

export default AppPageFooter;
