import { LinearProgress } from '@mui/material';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthRoute from 'src/components/AuthRoute';
import ArticlePage from './pages/Article';
import WritePage from './pages/dashboard/Write';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import SearchPage from './pages/Search';
import TagPage from './pages/Tag';
import UserPage from './pages/User';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/',
  WRITE: '/dashboard/write',
  ARTICLE: (id) => `/article/${id}`,
  TAG: (id) => `/tag/${id}`,
  USER: (id) => `/user/${id}`,
  SEARCH: (value) => `/search?q=${value}`,
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
      <AuthRoute auth={false} redirect={ROUTES.LOGIN}>
        <Suspense fallback={<LinearProgress />}>
          <Outlet />
        </Suspense>
      </AuthRoute>
    ),
    children: [
      { path: 'write', exact: true, element: <WritePage /> },
      { path: '*', element: <Navigate to={ROUTES.HOME} /> },
    ],
  },
  { path: '/search', exact: true, element: <SearchPage /> },
  { path: '/tag/:id', exact: true, element: <TagPage /> },
  { path: '/user/:id', exact: true, element: <UserPage /> },
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
