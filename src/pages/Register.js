import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MuiLink from '@mui/material/Link';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { ROUTES } from 'src/routes';

export default function RegisterPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container component='main' maxWidth='xs'>
        <Paper sx={{ px: 3, py: 4 }}>
          <Typography color='primary' variant='h3'>
            <b>Sign Up</b>
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                size='small'
                label='Name'
                name='name'
                autoComplete='name'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                size='small'
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                size='small'
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              <TextField
                margin='normal'
                required
                size='small'
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ color: 'white', mt: 2, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link to={ROUTES.LOGIN}>
                    <MuiLink variant='body2'>
                      {'Already have an account?'}
                    </MuiLink>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
