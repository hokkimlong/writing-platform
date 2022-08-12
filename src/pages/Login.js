import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MuiLink from '@mui/material/Link';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { ROUTES } from 'src/routes';
import AUTH_API from 'src/api/auth';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { setToken } from 'src/api/custom-axios';
import { useAuth } from 'src/contexts/AuthProvider';

export default function LoginPage() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const { setUser } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await AUTH_API.login(data);
      setToken(response.data.token);
      setUser(response.data.user);
      navigate(ROUTES.HOME);
    } catch (error) {
      Swal.fire(
        'Login Failed',
        error?.response?.data?.message || 'Login Failed',
        'error'
      );
    }
  };
  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
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
            <b>Sign in</b>
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box noValidate sx={{ mt: 1 }}>
              <Controller
                name='email'
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
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
                      value={value}
                      onChange={onChange}
                    />
                  );
                }}
              ></Controller>
              <Controller
                name='password'
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
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
                      value={value}
                      onChange={onChange}
                    />
                  );
                }}
              ></Controller>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ color: 'white', mt: 2, mb: 2 }}
              >
                Sign in
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link to={ROUTES.REGISTER}>
                    <MuiLink variant='body2'>{'Need an account?'}</MuiLink>
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
