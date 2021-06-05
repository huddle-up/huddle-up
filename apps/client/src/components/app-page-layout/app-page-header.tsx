import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { LargeLogo } from '../logo';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateColumns: '1fr auto 1fr',
    gridTemplateAreas: '"menu logo actions"',
    columnGap: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      gridTemplateAreas: '"logo menu actions"',
    },
  },
  logoContainer: {
    display: 'flex',
    gridArea: 'logo',
  },
  logo: {
    width: 120,
  },
  menu: {
    gridArea: 'menu',
    display: 'flex',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },
  actions: {
    gridArea: 'actions',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

interface AppPageHeaderProps {
  menu?: React.ReactNode;
  actions?: React.ReactNode;
}

function AppPageHeader({ menu, actions }: AppPageHeaderProps) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Link to={ROUTES.meetings.allMeetings} className={classes.logoContainer}>
          <LargeLogo className={classes.logo} />
        </Link>
        <div className={classes.menu}>{menu}</div>
        <div className={classes.actions}>{actions}</div>
      </Toolbar>
    </AppBar>
  );
}
AppPageHeader.defaultProps = {
  menu: undefined,
  actions: undefined,
};

export default AppPageHeader;
