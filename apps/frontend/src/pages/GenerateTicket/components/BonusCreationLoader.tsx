import { Loader } from '@io-cdc/ui';
import { Stack, Typography } from '@mui/material';

export const BonusCreationLoader = () => {
  return (
    <Stack height="100dvh" flex={1} justifyContent="center" alignItems="center" rowGap={2}>
      <Loader />
      <Typography fontSize={22} fontWeight={700} textAlign="center">
        Stiamo generando il tuo buono
      </Typography>
      <Typography textAlign="center">Attendi qualche secondo</Typography>
    </Stack>
  );
};
