import { Icon } from '@io-cdc/ui';
import { Box, Snackbar, SnackbarProps, Typography } from '@mui/material';
import { ICON_COLOR_CONFIG } from './constants';

type ToastProps = SnackbarProps & {
  messageType?: 'success' | 'error' | 'default';
  message?: string;
};

export const Toast = ({ open, onClose, message, messageType = 'default' }: ToastProps) => {
  const { icon, color } = ICON_COLOR_CONFIG?.[messageType];
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={2000}
      onClose={onClose}
      sx={{ zIndex: 9999 }}
    >
      <Box
        sx={{
          minWidth: '70%',
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'white',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '4px 4px 12px rgba(0, 43, 85, 0.1)',
        }}
      >
        <Box sx={{ width: 6, height: '3.5rem', bgcolor: color }} />
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            p: 1.5,
          }}
        >
          <Icon name={icon} sx={{ color }} />
          <Typography>{message}</Typography>
        </Box>
      </Box>
    </Snackbar>
  );
};
