import {
  Autocomplete,
  Button,
  Grid,
  InputBase,
  Paper,
  TextField,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ARTICLE_API from 'src/api/article';
import TAG_API from 'src/api/tag';
import RichTextEditor from 'src/components/RichText';
import Tag from 'src/components/Tag';
import { ROUTES } from 'src/routes';
import Swal from 'sweetalert2';

const WritePage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      tags: [],
      body: '',
    },
  });

  const onSubmit = async (data) => {
    console.log('data', data);
    const { title, content, tags } = data;
    const payload = {
      title,
      content,
      tags: tags.filter((tag) => typeof tag !== 'string'),
      newTags: tags.filter((tag) => typeof tag === 'string'),
    };

    Swal.fire({
      title: 'Create Post',
      html: 'Creating...', // add html attribute if you want or remove
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        ARTICLE_API.create(payload)
          .then((response) => {
            Swal.close();
            Swal.fire({
              title: 'Create Success',
              html: 'Your post has been published',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
              willClose: () => {
                navigate(ROUTES.HOME);
              },
            });
          })
          .catch((error) => {
            Swal.fire('Create Failed', error?.response?.data?.message, 'errro');
          });
      },
    });
  };

  return (
    <Box my={2} height='100%'>
      <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <Container sx={{ height: '100%' }}>
          <Grid
            container
            sx={{ height: '100%' }}
            direction='column'
            spacing={2}
          >
            <Grid item xs>
              <Paper sx={{ height: '100%' }}>
                <Box
                  sx={{
                    py: 3,
                    px: 6,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Controller
                    name='title'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <InputBase
                        value={value}
                        onChange={onChange}
                        placeholder='New post title here...'
                        sx={{ fontSize: '44px', fontWeight: '600' }}
                      />
                    )}
                  ></Controller>
                  <Controller
                    defaultValue={[]}
                    control={control}
                    name='tags'
                    rules={{ required: true }}
                    render={({ field: { value, onChange, ref } }) => (
                      <TagsInput value={value} onChange={onChange} ref={ref} />
                    )}
                  ></Controller>
                  <Controller
                    name='content'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <RichTextEditor value={value} onChange={onChange} />
                    )}
                  ></Controller>
                </Box>
              </Paper>
            </Grid>
            <Grid
              item
              sx={{ mb: 1 }}
              container
              justifyContent={'space-between'}
            >
              <Button variant='contained' type='submit' sx={{ color: 'white' }}>
                Publish
              </Button>
              <Button
                variant='contained'
                color='inherit'
                sx={{ color: 'grey' }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Container>
      </form>
    </Box>
  );
};

const TagsInput = React.forwardRef(({ value, onChange }, ref) => {
  const [list, setList] = useState([]);

  const search = async (value) => {
    try {
      const response = await TAG_API.list({ search: value, page: 0 });
      setList(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Autocomplete
      value={value}
      autoHighlight
      onChange={(e, data) => {
        onChange(data);
      }}
      onKeyUp={(e) => {
        const value = e.target.value;
        search(value);
      }}
      multiple
      options={list}
      freeSolo
      disableClearable
      getOptionLabel={(option) => option.name}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          const name = option?.name ?? option;
          return <Tag name={name} {...getTagProps({ index })} />;
        })
      }
      renderInput={(params) => (
        <TextField
          sx={{
            mb: 2,
          }}
          {...params}
          inputRef={ref}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
          }}
          variant='standard'
          size='small'
          placeholder='Add tags by select or type then hit enter...'
        />
      )}
    />
  );
});
export default WritePage;
