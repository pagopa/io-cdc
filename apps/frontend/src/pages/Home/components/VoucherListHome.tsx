import { EmptyState } from '@io-cdc/ui';
import { Typography, Divider } from '@mui/material';
import { Stack } from '@mui/system';
import { useMemo } from 'react';
import { VoucherCard } from '../../BonusList/components/BonusItem';
import { VoucherItem } from '../../../features/app/model';
import { separateVouchersByStatus } from '../../../utils/separateVouchersByStatus';

type VoucherListHome = {
  vouchers: VoucherItem[];
  onClickShowAll: () => void;
  setOpenSheet: (arg: [boolean, boolean]) => void;
};

export const VoucherListHome = ({ vouchers, setOpenSheet, onClickShowAll }: VoucherListHome) => {
  const { toSpend: tbsAll, spent: sAll } = useMemo(
    () => separateVouchersByStatus(vouchers),
    [vouchers],
  );

  const toSpend = useMemo(() => {
    return tbsAll.slice(0, 4);
  }, [tbsAll]);

  const spent = useMemo(() => {
    return sAll.slice(0, 4);
  }, [sAll]);

  return (
    <>
      {vouchers && vouchers.length > 0 ? (
        <Stack width="100%" gap={2} paddingTop={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={700} fontSize={14}>
              BUONI DA SPENDERE
            </Typography>
            <Typography
              fontSize={16}
              fontWeight={600}
              margin={0}
              onClick={onClickShowAll}
              sx={{
                color: '#0073E6',
                textDecoration: 'none',
              }}
            >
              Mostra tutti
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
            <Stack minHeight={100} justifyContent="center">
              <EmptyState icon="info" title="Non sono stati trovati buoni" />
            </Stack>
          )}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={700} fontSize={14}>
              BUONI SPESI
            </Typography>
            {spent.length ? (
              <Typography
                fontSize={16}
                fontWeight={600}
                margin={0}
                onClick={onClickShowAll}
                sx={{
                  color: '#0073E6',
                  textDecoration: 'none',
                }}
              >
                Mostra tutti
              </Typography>
            ) : null}
          </Stack>
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
            <Stack minHeight={100} justifyContent="center">
              <EmptyState icon="info" title="Non sono stati trovati buoni" />
            </Stack>
          )}
        </Stack>
      ) : (
        <Stack justifyContent="center" alignItems="center" py={4} gap={2}>
          <Typography fontWeight={600}>Genera un buono</Typography>
          <Typography textAlign="center">
            Qui troverai i buoni che genererai per i tuoi acquisti.
          </Typography>
        </Stack>
      )}
    </>
  );
};
