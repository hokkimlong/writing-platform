import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ROUTES } from 'src/routes';
import MuiLink from '@mui/material/Link';

const drawerWidth = 240;

export default function Layout(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary={'bar'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: 'flex',
        color: 'black',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <AppBar component='nav' color='inherit'>
        <Container>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Link style={{ textDecoration: 'none' }} to={ROUTES.HOME}>
                <Typography
                  variant='h6'
                  component='div'
                  sx={{ display: { xs: 'none', sm: 'block' }, mr: 1 }}
                  color='primary'
                >
                  <b>RE AD</b>
                </Typography>
              </Link>
              <TextField placeholder='Search...' size='small' />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Link style={{ textDecoration: 'none' }} to={ROUTES.LOGIN}>
                <Button sx={{ mr: 1 }}>Log in</Button>
              </Link>
              <Link style={{ textDecoration: 'none' }} to={ROUTES.REGISTER}>
                <Button variant='contained' sx={{ color: 'white' }}>
                  Create account
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}
