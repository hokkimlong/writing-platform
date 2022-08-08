import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

import { useRoutes } from 'react-router-dom';

import ROUTES_PATH from './routes';
import Layout from './layout';

function App() {
  const ROUTES = useRoutes(ROUTES_PATH);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>{ROUTES}</Layout>
    </ThemeProvider>
  );
}

export default App;
