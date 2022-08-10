import { Avatar, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

const Profile = ({ date, user }) => {
  return (
    <Grid container spacing={1}>
      <Grid item>
        <Avatar sx={{ width: '38px', height: '38px' }} />
      </Grid>
      <Grid item>
        <Typography variant='body2'>
          <Typography color='textPrimary'>
            <b>{user?.name}</b>
          </Typography>
          <Typography color='textSecondary' variant='caption'>
            {dayjs(date).format('MMM d')}
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Profile;
