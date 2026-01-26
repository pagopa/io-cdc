import { EmptyState } from '@io-cdc/ui';
import { Stack } from '@mui/system';

export const EmptyVouchers = ({ type = 'TO_SPEND' }: { type?: 'SPENT' | 'TO_SPEND' }) => {
  const toSpend = type === 'TO_SPEND';

  const title = toSpend
    ? 'Qui troverai i buoni che genererai per i tuoi acquisti.'
    : 'Nessun buono speso. Quando verrà speso un buono, lo vedrai qui.';

  return (
    <Stack minHeight={100} justifyContent="center">
      <EmptyState title={title} />
    </Stack>
  );
};
