import React from 'react';
import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link, LinkButton } from '../link';
import { LargeLogo } from '../logo';
import { ROUTES } from '../../routes';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  logoContainer: {
    display: 'flex',
  },
  logo: {
    width: 120,
  },
  spacer: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

function PublicPageHeader() {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={classes.logoContainer}>
          <LargeLogo className={classes.logo} />
        </Link>
        <div className={classes.spacer} />
        <nav>
          <Link variant="button" color="inherit" to={ROUTES.auth.login} className={classes.link}>
            {t('global.button.login')}
          </Link>
          <LinkButton to={ROUTES.auth.register} color="inherit" variant="outlined" className={classes.link}>
            {t('global.button.register')}
          </LinkButton>
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default PublicPageHeader;
