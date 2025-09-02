import { useMemo } from 'react';
import { Divider, Stack } from '@mui/material';
import { VoucherCard } from '../../pages/BonusList/components/BonusItem';
import { EmptyState, SectionTitle } from '@io-cdc/ui';
import { VoucherItem } from '../../features/app/model';

type VoucherListProps = {
  vouchersList: VoucherItem[];
};
export const VoucherList = ({ vouchersList }: VoucherListProps) => {
  const toSpend = useMemo(
    () => vouchersList.filter(({ status }) => status === 'PENDING'),
    [vouchersList],
  );
  const spent = useMemo(
    () => vouchersList.filter(({ status }) => status === 'USED'),
    [vouchersList],
  );

  const lastUpdateLabel = useMemo(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const label = `Saldo aggiornato al ${formattedDate}, ${formattedTime}`;
    return label;
  }, []);

  return (
    <Stack gap={8}>
      <Stack>
        <SectionTitle
          title="Buoni da spendere"
          description={`Saldo aggiornato al ${lastUpdateLabel}`}
        />
        {toSpend.length ? (
          toSpend.map((voucher, index, array) => (
            <Stack gap={3} key={voucher.id} paddingTop={3}>
              <VoucherCard voucher={voucher} spent={false} />
              {index !== array.length - 1 && <Divider />}
            </Stack>
          ))
        ) : (
          <Stack minHeight={100} justifyContent="center">
            <EmptyState icon="info" title="Non sono stati trovati buoni" />
          </Stack>
        )}
      </Stack>
      <Stack>
        <SectionTitle title="Buoni spesi" />
        {spent.length ? (
          spent.map((voucher, index, array) => (
            <Stack gap={3} key={voucher.id} paddingTop={3}>
              <VoucherCard voucher={voucher} spent={true} />
              {index !== array.length - 1 && <Divider />}
            </Stack>
          ))
        ) : (
          <Stack minHeight={100} justifyContent="center">
            <EmptyState icon="info" title="Non sono stati trovati buoni" />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
