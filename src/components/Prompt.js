import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';

const Prompt = ({ state, backdropClose = true }) => {
  return (
    <Dialog
      open={state.state}
      onClose={() => backdropClose && state.onClose()}
      fullWidth
      maxWidth='xs'
    >
      {state.title && <DialogTitle>{state.title}</DialogTitle>}
      {state.message && <DialogContent>{state.message}</DialogContent>}
      {state?.buttons && (
        <DialogActions>
          {state?.buttons?.map((button, index) => (
            <Button key={index} {...state?.buttonActions?.[index]} {...button}>
              {button.text}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
};

export const usePrompt = (
  { title, message, buttons, buttonActions } = {
    title: '',
    message: '',
    buttons: [],
    buttonActions: [],
  }
) => {
  const [state, setState] = useState({
    state: false,
    title,
    message,
    buttons,
    buttonActions,
  });

  /**
   * Open Prompt with modifier
   * @param {object} modifier
   * @param {string} modifier.title Prompt Title
   * @param {string} modifier.message Prompt Message
   * @param {object[]} modifier.buttons Prompt Buttons
   * @param {object[]} modifier.buttonProps Prompt Buttons Props
   */
  const openPrompt = (modifier = {}) => {
    setState((prev) => {
      return { ...prev, state: true, ...modifier };
    });
  };

  const closePrompt = (modifier = {}) => {
    setState((prev) => {
      return { ...prev, state: false, ...modifier };
    });
  };

  return {
    promptState: { ...state, onClose: closePrompt },
    openPrompt,
    closePrompt,
  };
};

export default Prompt;
