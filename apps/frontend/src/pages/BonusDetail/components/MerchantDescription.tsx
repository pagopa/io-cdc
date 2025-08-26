import { Icon } from '@io-cdc/ui';
import { Stack, Typography } from '@mui/material';

export const MerchantDescription = () => {
  return (
    <Stack rowGap={4}>
      <Stack direction="row" gap={1}>
        <Icon name="store" />
        <Typography fontWeight={700}>ESERCENTE</Typography>
      </Stack>
      <Stack>
        <Typography fontWeight={600} fontSize={18}>
          Libreria Mondadori
        </Typography>
        <Typography color="#5C6F82">15 gen 2026</Typography>
      </Stack>
    </Stack>
  );
};
