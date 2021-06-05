import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useAuth } from '../../contexts/auth';
import { ROUTES } from '../../routes';

function PublicRoute({ children, ...props }: RouteProps) {
  const { loggedIn } = useAuth();
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...props}>{loggedIn ? <Redirect to={ROUTES.meetings.allMeetings} /> : children}</Route>;
}

export default PublicRoute;
