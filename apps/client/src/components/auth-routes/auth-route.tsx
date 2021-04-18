import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useAuth } from '../../contexts/auth';

function AuthRoute({ children, ...props }: RouteProps) {
  const { loggedIn } = useAuth();
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...props}>{loggedIn ? children : <Redirect to="/" />}</Route>;
}

export default AuthRoute;
