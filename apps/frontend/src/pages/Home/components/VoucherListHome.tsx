import { Typography, Divider, CircularProgress } from '@mui/material';
import { Stack } from '@mui/system';
import { useCallback, useMemo } from 'react';
import { VoucherCard } from '../../BonusList/components/BonusItem';
import { separateVouchersByStatus } from '../../../utils/separateVouchersByStatus';
import { useSelector } from 'react-redux';
import { selectActiveCard } from '../../../features/app/selectors';
import { EmptyVouchers } from '../../../components/VoucherList/EmptyVouchers';
import { useGetVouchers } from '../../../hooks/useGetVouchers';
import { Reminder } from './Reminder';
import { VoucherListError } from '../../../components';

type VoucherListHome = {
  onClickShowAll: () => void;
  setOpenSheet: (arg: [boolean, boolean]) => void;
};

export const VoucherListHome = ({ setOpenSheet, onClickShowAll }: VoucherListHome) => {
  const activeCard = useSelector(selectActiveCard);

  const { vouchers, getVouchers, isError, isSuccess } = useGetVouchers();

  const loading = useMemo(() => !isError && !isSuccess, [isError, isSuccess]);

  const { toSpend: tbsAll, spent: sAll } = useMemo(
    () => separateVouchersByStatus(vouchers ?? []),
    [vouchers],
  );

  const forceReload = useCallback(() => {
    getVouchers(activeCard);
  }, [activeCard, getVouchers]);

  const toSpend = useMemo(() => {
    return tbsAll.slice(0, 4);
  }, [tbsAll]);

  const spent = useMemo(() => {
    return sAll.slice(0, 4);
  }, [sAll]);

  if (isError) return <VoucherListError reload={forceReload} />;

  if (loading)
    return (
      <Stack height="100dvh" flex={1} justifyContent="center" alignItems="center" rowGap={2}>
        <CircularProgress />
      </Stack>
    );

  return (
    <>
      {vouchers && vouchers.length > 0 ? (
        <>
          <Reminder />
          <Stack width="100%" gap={2}>
            <Stack
              direction="row"
              paddingTop={3}
              justifyContent="space-between"
              alignItems="center"
            >
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
            <Stack>
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
            <Stack
              direction="row"
              paddingTop={3}
              justifyContent="space-between"
              alignItems="center"
            >
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
            <Stack>
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
                <EmptyVouchers type="SPENT" />
              )}
            </Stack>
          </Stack>
        </>
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
