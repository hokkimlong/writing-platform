import { Chip, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Tag = ({ name, ...props }) => {
  return (
    <Chip
      component='a'
      clickable
      size='small'
      label={
        <Box display='flex' alignItems='center'>
          <Typography color='primary' sx={{ fontWeight: '600' }}>
            #
          </Typography>
          <Typography variant='caption'>{name}</Typography>
        </Box>
      }
      {...props}
    />
  );
};

export default Tag;
