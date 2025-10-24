import { Icon } from '@io-cdc/ui';
import { Box, Button, Snackbar, SnackbarProps, Typography } from '@mui/material';
import { ICON_COLOR_CONFIG } from './constants';

type ToastProps = SnackbarProps & {
  messageType?: 'reminder' | 'success' | 'error' | 'default';
  message?: string;
};

export const Toast = ({
  open,
  onClose,
  message,
  messageType = 'default',
  children,
}: ToastProps) => {
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
            gap: '1.2rem',
            px: 1.5,
            py: 2,
          }}
        >
          <Icon name={icon} sx={{ color }} />
          {children}
          <Typography>{message}</Typography>
          {messageType === 'reminder' && (
            <Button
              variant="text"
              onClick={() => localStorage.setItem('reminder', 'true')}
              sx={{
                color: '#0070f3',
                fontWeight: 'bold',
                fontSize: 16,
                textTransform: 'none',
                alignSelf: 'flex-start',
              }}
            >
              Ho capito
            </Button>
          )}
        </Box>
      </Box>
    </Snackbar>
  );
};
