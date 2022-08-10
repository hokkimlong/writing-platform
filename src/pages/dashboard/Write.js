import {
  Autocomplete,
  Button,
  Chip,
  Grid,
  InputBase,
  Paper,
  TextField,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import RichTextEditor from 'src/components/RichText';
import Tag from 'src/components/Tag';

const WritePage = () => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: '',
      tags: [],
      body: '',
    },
  });

  const onSubmit = (data) => {
    console.log('data', data);
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
                    render={({ field: { value, onChange, ref } }) => (
                      <Autocomplete
                        value={value}
                        onChange={(e, data) => {
                          onChange(data);
                        }}
                        multiple
                        options={['apple']}
                        freeSolo
                        disableClearable
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Tag name={option} {...getTagProps({ index })} />
                          ))
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
                    )}
                  ></Controller>
                  <Controller
                    name='body'
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
export default WritePage;
