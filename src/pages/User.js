import { Box, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ARTICLE_API from 'src/api/article';
import AUTH_API from 'src/api/auth';
import BlogCard from 'src/components/BlogCard';
import { TagList } from './Home';

const UserPage = () => {
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const handleFetchArticle = async () => {
      try {
        const [articleResponse, userResponse] = await Promise.all([
          ARTICLE_API.list({
            search: '',
            user: id,
            limit: 10,
            page: 0,
          }),
          AUTH_API.getUserById(id),
        ]);
        setArticles(articleResponse.data);
        setUser(userResponse.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    handleFetchArticle();
  }, [id]);

  return (
    <Box my={2}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Grid
              container
              spacing={2}
              sx={{ position: 'sticky', top: '64px' }}
            >
              <Grid item xs={12}>
                <Typography variant='h2'>Tags</Typography>
              </Grid>
              <Grid item xs={12}>
                <TagList />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h2'>User {user?.name || '--'}</Typography>
              </Grid>
              {articles.map(({ id, tags, title, createdAt, user }) => (
                <Grid item xs={12}>
                  <BlogCard
                    id={id}
                    tags={tags}
                    title={title}
                    user={user}
                    date={createdAt}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserPage;
