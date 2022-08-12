import { Avatar as MuiAvatar } from '@mui/material';

const Avatar = ({ name, width = '36px', height = '36px' }) => {
  return (
    <MuiAvatar
      sx={{
        width,
        height,
        background: 'white',
        color: (theme) => theme.palette.primary.main,
        border: (theme) => `2px solid ${theme.palette.primary.main}`,
      }}
    >
      {name?.[0]?.toUpperCase()}
    </MuiAvatar>
  );
};
export default Avatar;
