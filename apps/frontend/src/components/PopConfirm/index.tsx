import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { useEffect } from 'react';

type ButtonConfig = {
  title: string;
  onClick: () => void;
};
type PopConfirmProps = {
  title: string;
  description?: string;
  buttonConfirm: ButtonConfig;
  buttonClose: ButtonConfig;
  isOpen: boolean;
  onOpen?: () => void;
};

export const PopConfirm = ({
  title,
  description,
  buttonConfirm,
  buttonClose,
  isOpen,
  onOpen,
}: PopConfirmProps) => {
  useEffect(() => {
    if (isOpen) {
      onOpen?.();
    }
  }, [isOpen, onOpen]);
  return (
    <Dialog
      open={isOpen}
      onClose={buttonClose.onClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {description && (
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
        }}
      >
        <Button onClick={buttonConfirm.onClick} color="error">
          {buttonConfirm.title}
        </Button>
        <Button onClick={buttonClose.onClick} autoFocus>
          {buttonClose.title}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
