import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import dayjs from 'dayjs';
import { useState } from 'react';
import BlogArtical from 'src/components/BlogArticle';
import SendIcon from '@mui/icons-material/Send';

const ArticlePage = () => {
  const [article, setArticle] = useState({
    title: 'Hello World',
    user: { name: 'KIKI' },
    createdAt: new Date(),
    tags: [{ name: 'apple' }, { name: 'banana' }],
    body: `
    hello every body
   forward and start building a website.
Building a website isn't as simple a task as it sounds. Some people just drop a WordPress installation and paste a theme on it, but I'm looking for something more interesting and advanced.
Building a site involves a lot of planning in choosing the right framework for the task. So with that thought, I'm writing this article about choosing the right framework. Should it be react, Vue, Next JS, or even something I'm not familiar with?

Define Your Purpose 
    `,
  });
  return (
    <Box my={2}>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Paper>
              <Grid container>
                <Grid item>
                  <Box sx={{ px: 6, py: 3 }}>
                    <BlogArtical article={article} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ px: 6, py: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant='h5'>
                          <b>Discussion</b>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <SendDiscussionBox />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          {Array.from(new Array(6)).map((item) => (
                            <Grid item xs={12}>
                              <Comment />
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const SendDiscussionBox = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs='auto'>
        <Avatar sx={{ width: '36px', height: '36px' }} />
      </Grid>
      <Grid item xs sx={{ position: 'relative' }}>
        <TextField
          size='small'
          multiline
          minRows={2}
          fullWidth
          placeholder='Add to discussion'
          variant='outlined'
          inputProps={{ style: { paddingBottom: '38px' } }}
        />
        <Button
          endIcon={<SendIcon />}
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            margin: 1,
          }}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
};

const Comment = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs='auto'>
        <Avatar sx={{ width: '36px', height: '36px', mt: 1 }} />
      </Grid>
      <Grid item xs>
        <Box
          sx={{
            border: (theme) => `1px solid ${theme.palette.grey[300]}`,
            borderRadius: '8px',
            padding: '14px',
            width: '100%',
          }}
        >
          <Grid container spacing={1}>
            <Grid item container>
              <Typography sx={{ fontSize: '14px' }}>
                <b>Name</b>
              </Typography>
              <Typography
                color='textSecondary'
                sx={{ mx: '8px', fontSize: '16px' }}
              >
                •
              </Typography>
              <Typography color='textSecondary' sx={{ fontSize: '14px' }}>
                {dayjs(new Date()).format('MMM d')}
              </Typography>
            </Grid>
            <Grid item>
              <Box>
                <Typography>hello</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
export default ArticlePage;
