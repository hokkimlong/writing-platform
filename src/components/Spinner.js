import {
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const Spinner = ({ state }) => {
  return (
    <Dialog open={state.state} fullWidth maxWidth="xs">
      {state.title && <DialogTitle>{state.title}</DialogTitle>}
      <DialogContent>
        <Typography>{state.message}</Typography>
        <LinearProgress
          variant={state.progressVariant}
          {...state.progressProps}
        />
      </DialogContent>
    </Dialog>
  );
};

export const useSpinner = (
  { title, progressProps, progressVariant, message } = {
    title: '',
    message: '',
    progressProps: {},
    progressVariant: 'indeterminate',
  }
) => {
  const [state, setState] = useState({
    state: false,
    title,
    message,
    progressProps,
    progressVariant,
  });

  const openSpinner = (modifier = {}) => {
    setState((prev) => {
      return { ...prev, state: true, ...modifier };
    });
  };

  const updateSpinner = (modifier = {}) => {
    setState((prev) => {
      return { ...prev, ...modifier };
    });
  };

  const closeSpinner = (modifier = {}) => {
    setState((prev) => {
      return { ...prev, state: false, ...modifier };
    });
  };

  return {
    spinnerState: state,
    openSpinner,
    closeSpinner,
    updateSpinner,
  };
};

export default Spinner;
