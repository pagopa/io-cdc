import { useMemo, useState } from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import { VoucherCard } from '../../pages/BonusList/components/BonusItem';
import { EmptyState, SectionTitle, theme } from '@io-cdc/ui';
import { VoucherItem } from '../../features/app/model';
import { OthersBonusSheet } from '../OthersBonusSheet';
import { separateVouchersByStatus } from '../../utils/separateVouchersByStatus';
import { EmptyVouchers } from './EmptyVouchers';

type VoucherListProps = {
  vouchersList: VoucherItem[];
};
export const VoucherList = ({ vouchersList }: VoucherListProps) => {
  const [openSheet, setOpenSheet] = useState<[isOpen: boolean, spent: boolean]>([false, false]);

  const { toSpend, spent } = useMemo(() => separateVouchersByStatus(vouchersList), [vouchersList]);

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
    <Stack>
      <Stack mb={4}>
        <Stack gap={1}>
          <Typography fontSize={28} fontWeight="bold" variant="h4">
            Buoni da spendere
          </Typography>
          <Typography color={theme.palette.text.secondary} fontSize={12}>
            {lastUpdateLabel}
          </Typography>
        </Stack>
        {toSpend.length ? (
          toSpend.map((voucher, index, array) => (
            <Stack gap={3} key={voucher.id} paddingTop={3}>
              <VoucherCard
                voucher={voucher}
                spent={false}
                openSheet={() => setOpenSheet([true, false])}
              />
              {index !== array.length - 1 && <Divider />}
            </Stack>
          ))
        ) : (
          <EmptyVouchers />
        )}
      </Stack>
      <Stack>
        <SectionTitle title="Buoni spesi" />
        {spent.length ? (
          spent.map((voucher, index, array) => (
            <Stack gap={3} key={voucher.id} paddingTop={3}>
              <VoucherCard
                voucher={voucher}
                spent={true}
                openSheet={() => setOpenSheet([true, true])}
              />
              {index !== array.length - 1 && <Divider />}
            </Stack>
          ))
        ) : (
          <EmptyVouchers />
        )}
      </Stack>
      <OthersBonusSheet openSheet={openSheet} onClose={() => setOpenSheet([false, false])} />
    </Stack>
  );
};
