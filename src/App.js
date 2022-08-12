import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

import { useRoutes } from 'react-router-dom';

import ROUTES_PATH from './routes';
import Layout from './layout';
import AuthContextProvider from './contexts/AuthProvider';
import { useEffect } from 'react';
import ScrollToTop from './components/ScrollTop';

function App() {
  const ROUTES = useRoutes(ROUTES_PATH);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop />
      <CssBaseline />
      <AuthContextProvider>
        <Layout>{ROUTES}</Layout>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
