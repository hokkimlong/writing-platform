import { Box, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ARTICLE_API from 'src/api/article';
import TAG_API from 'src/api/tag';
import BlogCard from 'src/components/BlogCard';
import { TagList } from './Home';

const TagPage = () => {
  const [articles, setArticles] = useState([]);
  const [tag, setTag] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const handleFetchArticle = async () => {
      try {
        const [articleResponse, tagResponse] = await Promise.all([
          ARTICLE_API.list({
            search: '',
            tag: id,
            limit: 10,
            page: 0,
          }),
          TAG_API.getById(id),
        ]);
        setArticles(articleResponse.data);
        setTag(tagResponse.data);
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
                <Typography variant='h2'>Tag #{tag?.name || '--'}</Typography>
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

export default TagPage;
