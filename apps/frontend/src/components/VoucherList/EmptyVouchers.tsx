import { EmptyState } from '@io-cdc/ui';
import { Stack } from '@mui/system';

export const EmptyVouchers = ({ type = 'TO_SPEND' }: { type?: 'SPENT' | 'TO_SPEND' }) => {
  const toSpend = type === 'TO_SPEND';

  const title = toSpend
    ? 'Non sono stati trovati buoni'
    : 'Nessun buono speso. Quando verrà speso un buono, lo vedrai qui.';
  const icon = toSpend ? 'info' : undefined;

  return (
    <Stack minHeight={100} justifyContent="center">
      <EmptyState icon={icon} title={title} />
    </Stack>
  );
};
