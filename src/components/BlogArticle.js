import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Profile from './Profile';
import Tag from './Tag';

const BlogArtical = ({ article }) => {
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Profile user={article?.user} date={article?.createdAt} />
      </Grid>
      <Grid item>
        <Typography variant='h3' sx={{ fontWeight: '600' }}>
          {article?.title}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={1}>
          {article.tags?.map((tag) => (
            <Grid item>
              <Tag name={tag?.name} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Box>
          <Typography sx={{ fontSize: '20px' }}>{article.body}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
export default BlogArtical;
