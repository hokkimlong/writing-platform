import React from 'react';
import ReactQuill from 'react-quill';
import { Box } from '@mui/system';

import 'react-quill/dist/quill.snow.css';
// import { Controller } from 'react-hook-form';

const modules = {
  //resolve add extra line
  clipboard: {
    matchVisual: false,
  },
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ align: [] }],
    ['link'],
  ],
};

const RichTextEditor = ({ control, value, onChange }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        '& .quill': {
          height: '100%',
        },
        '& .ql-snow': { border: 0 },
        '& .ql-toolbar': {
          background: (theme) => theme.palette.grey[200],
        },
        '& .ql-editor': {
          fontFamily: 'Roboto',
          fontSize: '20px',
          py: 3,
          px: 0,
          maxHeight: '100%',
        },
      }}
    >
      <ReactQuill
        value={value}
        onChange={onChange}
        minHeight={4}
        placeholder='Write your post content here...'
        modules={modules}
      />
    </Box>
  );
};

export default RichTextEditor;
