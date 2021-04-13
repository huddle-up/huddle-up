import { makeStyles } from '@material-ui/core';
import React from 'react';
import { PublicPageFooter } from '../page-footer';
import { PublicPageHeader } from '../page-header';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0',
  },
});

interface PublicPageLayoutProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

function PublicPageLayout({ header, children, footer }: PublicPageLayoutProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {header || <PublicPageHeader />}
      <main className={classes.main}>{children}</main>
      {footer || <PublicPageFooter />}
    </div>
  );
}
PublicPageLayout.defaultProps = {
  header: undefined,
  children: undefined,
  footer: undefined,
};

export default PublicPageLayout;
