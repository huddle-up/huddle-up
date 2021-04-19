import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LinkButton } from '../link';
import AppPageHeader from './app-page-header';
import AppPageMenu from './app-page-menu';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  offset: theme.mixins.toolbar,
  content: {
    flex: '1 0',
  },
}));

function AppPageLayout({ children }: { children: React.ReactNode }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <AppPageHeader
        menu={<AppPageMenu />}
        actions={
          <LinkButton variant="contained" disableElevation color="secondary" to="/meetings/create">
            {t('meetings.title.new')}
          </LinkButton>
        }
      />
      <div className={classes.offset} />
      <div className={classes.content}>{children}</div>
    </div>
  );
}

export default AppPageLayout;
