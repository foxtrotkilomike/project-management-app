import { Navigate } from 'react-router-dom';
import { routes } from '../../config/routes';
import React from 'react';
import { checkUserCredentials } from '../../services/authService';

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const isAuthenticatedUser = checkUserCredentials();

  if (!isAuthenticatedUser) {
    return <Navigate to={routes.MAIN} replace />;
  }

  return children;
};

type PrivateRouteProps = {
  children: React.ReactElement;
};

export { PrivateRoute };
