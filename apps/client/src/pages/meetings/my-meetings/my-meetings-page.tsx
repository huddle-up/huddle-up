import React from 'react';
import { useTranslation } from 'react-i18next';
import { matchPath, Route, useLocation } from 'react-router';
import { Box, ButtonGroup } from '@material-ui/core';
import { CalendarToday, AccessTime } from '@material-ui/icons';
import { AppPageTitle } from '../../../components/app-page-title';
import { LinkButton } from '../../../components/link';
import { ROUTES } from '../../../routes';
import MyPastMeetings from './my-past-meetings';
import MyUpcomingMeetings from './my-upcoming-meetings';

function MyMeetingsPage() {
  const { t } = useTranslation();

  const { pathname } = useLocation();
  const routeActive = (route: string) => {
    const match = matchPath(route, { path: pathname, exact: true });
    return match !== null;
  };

  return (
    <>
      <AppPageTitle title={t('global.title.myMeetings')}>
        <Box mt={2}>
          <ButtonGroup>
            <LinkButton
              startIcon={<CalendarToday />}
              variant={routeActive(ROUTES.meetings.myMeetings) ? 'contained' : 'outlined'}
              color="primary"
              size="small"
              to={ROUTES.meetings.myMeetings}>
              {t('meetings.myMeetingsNav.ongoingAndUpcoming')}
            </LinkButton>
            <LinkButton
              startIcon={<AccessTime />}
              variant={routeActive(ROUTES.meetings.myPastMeetings) ? 'contained' : 'outlined'}
              color="primary"
              size="small"
              to={ROUTES.meetings.myPastMeetings}>
              {t('meetings.myMeetingsNav.past')}
            </LinkButton>
          </ButtonGroup>
        </Box>
      </AppPageTitle>
      <Route path={ROUTES.meetings.myMeetings} exact>
        <MyUpcomingMeetings />
      </Route>
      <Route path={ROUTES.meetings.myPastMeetings}>
        <MyPastMeetings />
      </Route>
    </>
  );
}

export default MyMeetingsPage;
