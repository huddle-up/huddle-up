import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { AppPageTopMain } from '../app-page-layout';

const useStyles = makeStyles((theme) => ({
  top: {
    margin: theme.spacing(3, 0, 3),
    padding: theme.spacing(0, 2),
  },
  title: {
    fontSize: theme.typography.h3.fontSize,
  },
}));

interface AppPageTitleProps {
  title: string;
  children?: React.ReactNode;
}

function AppPageTitle({ title, children }: AppPageTitleProps) {
  const classes = useStyles();
  return (
    <AppPageTopMain className={classes.top}>
      <Typography component="h1" variant="h3" className={classes.title}>
        {title}
      </Typography>
      {children}
    </AppPageTopMain>
  );
}
AppPageTitle.defaultProps = {
  children: null,
};

export default AppPageTitle;
