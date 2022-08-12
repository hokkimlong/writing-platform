import { Box, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ARTICLE_API from 'src/api/article';
import BlogCard from 'src/components/BlogCard';
import { TagList } from './Home';

const getQuery = (search, queryName) => {
  return new URLSearchParams(search).get(queryName);
};

const SearchPage = () => {
  const [articles, setArticles] = useState([]);
  const search = useLocation().search;
  const query = getQuery(search, 'q');

  useEffect(() => {
    const handleFetchArticle = async () => {
      try {
        const response = await ARTICLE_API.list({
          search: query,
          limit: 10,
          page: 0,
        });
        setArticles(response.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    handleFetchArticle();
  }, [query]);

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
                <Typography variant='h2'>Search {query}</Typography>
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

export default SearchPage;
