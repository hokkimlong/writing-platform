import { Box, Grid, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import ARTICLE_API from 'src/api/article';
import TAG_API from 'src/api/tag';
import BlogCard from 'src/components/BlogCard';
import Tag from 'src/components/Tag';

const HomePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const handleFetchArticle = async () => {
      try {
        const response = await ARTICLE_API.list({
          search: '',
          limit: 10,
          page: 0,
        });
        setArticles(response.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    handleFetchArticle();
  }, []);

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
                <Typography variant='h2'>Latest</Typography>
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

export const TagList = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const handleFetchComment = async () => {
      try {
        const response = await TAG_API.list({ popular: 1 });
        setTags(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchComment();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={1}>
        {tags.map((item) => (
          <Grid item>
            <Tag
              id={item.id}
              size='large'
              name={item.name}
              available={item.availableArticle}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
export default HomePage;
