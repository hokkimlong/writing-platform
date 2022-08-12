import { Button, Grid, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/routes';
import Avatar from './Avatar';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const Profile = ({ date, user }) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(ROUTES.USER(user?.id));
  return (
    <Grid container spacing={1}>
      <Grid item>
        <IconButton size='small' onClick={handleNavigate}>
          <Avatar name={user?.name} width='38px' height='38px' />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography variant='body2'>
          <Button
            onClick={handleNavigate}
            sx={{ p: 0, justifyContent: 'flex-start' }}
          >
            <Typography color='textPrimary'>
              <b>{user?.name}</b>
            </Typography>
          </Button>
          <br />
          <Typography color='textSecondary' variant='caption'>
            {dayjs(date).format('MMM DD')} {`(${dayjs(date).fromNow()})`}
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Profile;
