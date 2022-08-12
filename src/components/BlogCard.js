import { Grid, Paper, Typography, Link as MuiLink } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { ROUTES } from 'src/routes';
import Profile from './Profile';
import Tag from './Tag';

const BlogCard = ({ id, user, title, tags, date = new Date() }) => {
  return (
    <Paper
      sx={{
        p: 2,
      }}
    >
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <Profile date={date} user={user} />
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <Box sx={{ width: '38px' }}></Box>
            </Grid>
            <Grid item>
              <Link to={ROUTES.ARTICLE(id)}>
                <MuiLink>
                  <Typography variant='h5' sx={{ fontWeight: '600' }}>
                    {title}
                  </Typography>
                </MuiLink>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <Box sx={{ width: '38px' }}></Box>
            </Grid>
            <Grid item>
              <Grid container spacing={1}>
                {tags?.map((item) => (
                  <Grid item>
                    <Tag name={item.name} id={item.id} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BlogCard;
