import { Icon, IconType } from '@io-cdc/ui';
import { Box, Snackbar, SnackbarProps, Typography } from '@mui/material';

type ToastProps = SnackbarProps & { iconName: IconType; bodyText?: string };

export const Toast = ({ open, onClose, iconName, bodyText }: ToastProps) => {
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
        }}
      >
        <Box sx={{ width: 6, height: '3.5rem', bgcolor: '#6CC66A' }} />
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            p: 1.5,
          }}
        >
          <Icon name={iconName} />
          <Typography>{bodyText}</Typography>
        </Box>
      </Box>
    </Snackbar>
  );
};
