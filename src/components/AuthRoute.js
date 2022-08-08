import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ auth = false, children, redirect, ...rest }) => {
  let isAuth = false;
  if ('userpos' === 'true') {
    isAuth = true;
  }

  return isAuth !== auth ? children : <Navigate to={redirect} />;
};

export default AuthRoute;
