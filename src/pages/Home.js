import { Box, Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import BlogCard from 'src/components/BlogCard';

const HomePage = () => {
  const [articles, setArticles] = useState(
    new Array(10).fill({
      user: { name: 'Kiki' },
      createdAt: new Date(),
      title: 'Hello world',
      tags: [{ name: 'apple' }, { name: 'banana' }],
    })
  );

  return (
    <Box my={2}>
      <Container>
        <Grid container spacing={2}>
          {articles.map(({ tags, title, createdAt, user }) => (
            <Grid item xs={12}>
              <BlogCard
                tags={tags}
                title={title}
                user={user}
                date={createdAt}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
export default HomePage;
