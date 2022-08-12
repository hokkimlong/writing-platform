import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MuiLink from '@mui/material/Link';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { ROUTES } from 'src/routes';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import AUTH_API from 'src/api/auth';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { control, handleSubmit, getValues } = useForm();

  const onSubmit = async (data) => {
    try {
      const { email, name, password, confirmPassword } = data;
      if (password !== confirmPassword) {
        Swal.fire('Form Validation Failed', 'Password not match', 'error');
        return;
      }
      await AUTH_API.register({ email, name, password });
      navigate(ROUTES.LOGIN);
    } catch (error) {
      Swal.fire(
        'Sign up failed',
        error?.response?.data?.message || 'Error',
        'error'
      );
      console.log(error);
    }
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <Box sx={{ mt: 1 }}>
                <Controller
                  name='name'
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <TextField
                        margin='normal'
                        required
                        fullWidth
                        size='small'
                        label='Name'
                        name='name'
                        autoComplete='name'
                        autoFocus
                        value={value}
                        onChange={onChange}
                      />
                    );
                  }}
                ></Controller>
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
                        type='email'
                        autoComplete='email'
                        value={value}
                        onChange={onChange}
                      />
                    );
                  }}
                ></Controller>
                <Controller
                  name='password'
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        error={error}
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
                <Controller
                  name='confirmPassword'
                  rules={{
                    validate: (value) => {
                      return value === getValues('password');
                    },
                  }}
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        error={error}
                        margin='normal'
                        required
                        size='small'
                        fullWidth
                        name='confirmPassword'
                        label='Confirm Password'
                        type='password'
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
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
