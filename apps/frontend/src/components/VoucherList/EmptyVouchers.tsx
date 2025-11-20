import { EmptyState } from '@io-cdc/ui';
import { Stack } from '@mui/system';

export const EmptyVouchers = () => {
  return (
    <Stack minHeight={100} justifyContent="center">
      <EmptyState icon="info" title="Non sono stati trovati buoni" />
    </Stack>
  );
};
