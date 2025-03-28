import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes/routes';

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  return loggedIn
    ? children
    : <Navigate to={routes.loginPage()} state={{ from: location }} replace />;
};

export default PrivateRoute;
