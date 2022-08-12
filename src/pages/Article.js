import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import BlogArtical from 'src/components/BlogArticle';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate, useParams } from 'react-router-dom';
import ARTICLE_API from 'src/api/article';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from 'src/contexts/AuthProvider';
import Swal from 'sweetalert2';
import { ROUTES } from 'src/routes';
import COMMENT_API from 'src/api/comment';
import Avatar from 'src/components/Avatar';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [refreshComment, setRefreshComment] = useState(false);
  const handleRefreshComment = () => {
    setRefreshComment((prev) => !prev);
  };

  useEffect(() => {
    const handleFetchArticle = async () => {
      if (id) {
        try {
          const response = await ARTICLE_API.getById(id);
          setArticle(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleFetchArticle();
  }, [id]);

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
                        <SendDiscussionBox
                          articleId={id}
                          handleRefreshComment={handleRefreshComment}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CommentList
                          articleId={id}
                          refreshComment={refreshComment}
                        />
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

const SendDiscussionBox = ({ articleId, handleRefreshComment }) => {
  const { control, reset, handleSubmit } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!user) {
      return requiredLogin();
    }

    try {
      const { message } = data;
      const payload = { articleId, message };
      const response = await COMMENT_API.create(payload);
      Swal.fire({
        showConfirmButton: false,
        timer: 1200,
        title: 'You just add a comment',
        icon: 'success',
        willClose: () => {
          handleRefreshComment();
          reset({ message: '' });
        },
      });
    } catch (error) {
      Swal.fire({ title: 'Send Comment failed', icon: 'error' });
    }
  };

  const requiredLogin = () => {
    Swal.fire({
      title: 'Login Required',
      icon: 'information',
      showDenyButton: true,
      showCloseButton: true,
      denyButtonText: 'Create account',
      confirmButtonText: 'Login',
      preConfirm: () => {
        navigate(ROUTES.LOGIN);
      },
      preDeny: () => {
        navigate(ROUTES.REGISTER);
      },
    });
  };

  return (
    <Grid
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      container
      spacing={1}
    >
      <Grid item xs='auto'>
        <Avatar width='36px' height='36px' name={user?.user?.name} />
      </Grid>
      <Grid item xs sx={{ position: 'relative' }}>
        <Controller
          name='message'
          control={control}
          render={({ field: { value, onChange, ref } }) => (
            <TextField
              required
              disabled={!user}
              inputRef={ref}
              onClick={() => {
                if (!user) {
                  requiredLogin();
                }
              }}
              value={value}
              onChange={onChange}
              size='small'
              multiline
              minRows={2}
              fullWidth
              placeholder='Add to discussion'
              variant='outlined'
              inputProps={{ style: { paddingBottom: '38px' } }}
            />
          )}
        ></Controller>
        <Button
          type='submit'
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

const CommentList = ({ articleId, refreshComment }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const handleFetchComment = async () => {
      if (articleId) {
        try {
          const response = await ARTICLE_API.getComment(articleId);
          setComments(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleFetchComment();
  }, [articleId, refreshComment]);

  return (
    <Grid container spacing={2}>
      {comments.map((item) => (
        <Grid item xs={12}>
          <Comment
            user={item.user}
            date={item.createdAt}
            message={item.message}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const Comment = ({ user, message, date }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs='auto'>
        <Avatar width='36px' height='36px' name={user?.name} />
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
                <b>{user?.name}</b>
              </Typography>
              <Typography
                color='textSecondary'
                sx={{ mx: '8px', fontSize: '16px' }}
              >
                •
              </Typography>
              <Typography color='textSecondary' sx={{ fontSize: '14px' }}>
                {dayjs(date).format('MMM DD')} {`(${dayjs(date).fromNow()})`}
              </Typography>
            </Grid>
            <Grid item>
              <Box>
                <Typography>{message}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
export default ArticlePage;
