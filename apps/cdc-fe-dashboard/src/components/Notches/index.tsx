import { Box, Paper, Typography } from '@mui/material';

export const Notches = () => {
  return (
    <Box position="relative" display="inline-block">
      <Paper
        elevation={3}
        sx={{
          px: 4,
          py: 3,
          bgcolor: '#F1ECE6',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Left notch */}
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: 'white',
            position: 'absolute',
            left: -16,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
          }}
        />

        {/* Right notch */}
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: 'white',
            position: 'absolute',
            right: -16,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
          }}
        />
        <Typography textAlign="center">Residuo</Typography>
      </Paper>
    </Box>
  );
};
