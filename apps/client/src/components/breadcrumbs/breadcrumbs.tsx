import { Breadcrumbs as MuiBreadcrumbs, makeStyles } from '@material-ui/core';
import React from 'react';
import { AppPageTopMain } from '../app-page-layout';

const useStyles = makeStyles((theme) => ({
  top: {
    margin: theme.spacing(5, 0, 2),
  },
}));

interface BreadcrumbsProps {
  children: React.ReactNode;
  noAside?: boolean;
}

function Breadcrumbs({ children, noAside }: BreadcrumbsProps) {
  const classes = useStyles();
  return (
    <AppPageTopMain className={classes.top} noAside={noAside}>
      <MuiBreadcrumbs separator="<">{children}</MuiBreadcrumbs>
    </AppPageTopMain>
  );
}
Breadcrumbs.defaultProps = {
  noAside: false,
};

export default Breadcrumbs;
