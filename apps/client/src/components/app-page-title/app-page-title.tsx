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
}

function AppPageTitle({ title }: AppPageTitleProps) {
  const classes = useStyles();
  return (
    <AppPageTopMain className={classes.top}>
      <Typography component="h1" variant="h3" className={classes.title}>
        {title}
      </Typography>
    </AppPageTopMain>
  );
}

export default AppPageTitle;
