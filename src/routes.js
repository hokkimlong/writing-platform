import { LinearProgress } from '@mui/material';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthRoute from 'src/components/AuthRoute';
import AuthContextProvider from 'src/contexts/AuthProvider';
import ArticlePage from './pages/Article';
import WritePage from './pages/dashboard/Write';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/',
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
    path: 'dashboard/*',
    element: (
      // <AuthRoute auth={true} redirect={ROUTES.LOGIN}>
      <AuthContextProvider>
        <Suspense fallback={<LinearProgress />}>
          <Outlet />
        </Suspense>
      </AuthContextProvider>
      // </AuthRoute>
    ),
    children: [
      { path: 'write', exact: true, element: <WritePage /> },
      { path: '*', element: <Navigate to={ROUTES.HOME} /> },
    ],
  },
  {
    path: '/article/:id',
    exact: true,
    element: <ArticlePage />,
  },
  {
    path: '/',
    exact: true,
    element: <HomePage />,
  },
  { path: '*', element: <Navigate to={ROUTES.LOGIN} /> },
];

export default ROUTES_PATH;
