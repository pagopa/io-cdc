import { CircularProgress, Stack, Typography } from '@mui/material';

export const RequestLoader = () => {
  return (
    <Stack flex={1} justifyContent="center" alignItems="center" rowGap={2}>
      <CircularProgress size={40} style={{ color: '#1a73e8' }} />
      <Typography fontSize={22} fontWeight={700} textAlign="center">
        Ti stiamo indirizzando al servizio
      </Typography>
      <Typography textAlign="center">Attendi qualche secondo</Typography>
    </Stack>
  );
};
