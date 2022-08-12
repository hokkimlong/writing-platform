import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from 'src/api/custom-axios';

const AuthRoute = ({ auth = false, children, redirect, ...rest }) => {
  let isAuth = false;
  const token = getToken();

  if (token) {
    isAuth = true;
  }

  return isAuth !== auth ? children : <Navigate to={redirect} />;
};

export default AuthRoute;
