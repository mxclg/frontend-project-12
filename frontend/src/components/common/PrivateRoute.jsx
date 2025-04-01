import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes/routes';

const PrivateRoute = ({ children }) => {
  const { loggedIn, isAuthChecked } = useAuth();
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  return loggedIn
    ? children
    : <Navigate to={routes.loginPage()} state={{ from: location }} replace />;
};

export default PrivateRoute;
