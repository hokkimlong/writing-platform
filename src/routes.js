import { LinearProgress } from '@mui/material';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthRoute from 'src/components/AuthRoute';
import AuthContextProvider from 'src/contexts/AuthProvider';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/home',
};

const ROUTES_PATH = [
  {
    path: 'login',
    element: (
      <AuthRoute auth={true} redirect={ROUTES.HOME}>
        <LoginPage />
      </AuthRoute>
    ),
  },
  {
    path: 'register',
    element: (
      <AuthRoute auth={true} redirect={ROUTES.HOME}>
        <RegisterPage />
      </AuthRoute>
    ),
  },
  {
    path: '/dashboard',
    exact: true,
    element: (
      <AuthRoute auth={false} redirect={ROUTES.LOGIN}>
        <AuthContextProvider>
          <Suspense fallback={<LinearProgress />}>
            <Outlet />
          </Suspense>
        </AuthContextProvider>
      </AuthRoute>
    ),
    children: [{ path: '*', element: <Navigate to={ROUTES.HOME} /> }],
  },
  { path: '*', element: <Navigate to={ROUTES.LOGIN} /> },
];

export default ROUTES_PATH;
