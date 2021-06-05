import { Container, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../routes';
import { LinkButton } from '../link';
import { UserMenu } from '../user-menu';
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
    flex: '0 0',
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `
      "top"
      "aside"
      "main"
      "meta"
    `,
    rowGap: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 3fr',
      gridTemplateRows: 'auto',
      gridTemplateAreas: `
      "top-aside top-main"
      "aside main"
      "meta main"
      `,
      rowGap: 0,
      columnGap: theme.spacing(3),
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 3fr 1fr',
      gridTemplateAreas: `
      "top-aside top-main top-meta"
      "aside main meta"
      `,
    },
  },
}));

function AppPageLayout({ children }: { children: React.ReactNode }) {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <AppPageHeader
        menu={<AppPageMenu />}
        actions={
          <>
            {isDesktop && (
              <LinkButton variant="contained" disableElevation color="secondary" to={ROUTES.meetings.create}>
                {t('meetings.title.new')}
              </LinkButton>
            )}
            <UserMenu />
          </>
        }
      />
      <div className={classes.offset} />
      <Container maxWidth="xl" className={classes.content}>
        {children}
      </Container>
    </div>
  );
}

export default AppPageLayout;
