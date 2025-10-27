import { Button, Divider, Stack, Typography } from '@mui/material';
import { Carousel } from '../../components/Carousel';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { APP_ROUTES } from '../../utils/appRoutes';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { VoucherCard } from '../BonusList/components/BonusItem';
import { EmptyState, Loader, theme } from '@io-cdc/ui';
import { useDispatch, useSelector } from 'react-redux';
import { selectTicketDeleted } from '../../features/app/selectors';
import { ticketsActions } from '../../features/app/reducers';
import { OthersBonusSheet } from '../../components/OthersBonusSheet';
import { useToast } from '../../contexts';
import { Reminder } from './components/Reminder';
import { useGetCardsAndVouchers, useRouteGuard } from '../../hooks';
import { separateVouchersByStatus } from '../../utils/separateVouchersByStatus';
// import { TEST_USERS } from '../../features/app/model';
// import { featureFlags } from '../../utils/featureFlags';

const Home = () => {
  //TODO test only
  useRouteGuard();

  const dispatch = useDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const deleted = useSelector(selectTicketDeleted);

  const { cards, vouchers, isSuccess, isError } = useGetCardsAndVouchers();

  const isFulfilled = isSuccess || isError;

  const [openSheet, setOpenSheet] = useState<[boolean, boolean]>([false, false]);

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

  const onClickBonus = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_GENERATION_START');
    navigate(APP_ROUTES.SELECT_CARD);
  }, [navigate]);

  const onClickBRetailers = useCallback(() => {
    trackWebviewEvent('CDC_CARD_SHOW_RETAILERS');
    //TODO add retailers redirect
  }, []);

  useEffect(() => {
    if (!cards) return;
    trackWebviewEvent('CDC_CARD_DETAIL');
  }, [cards]);

  const onClickShowAll = useCallback(() => {
    trackWebviewEvent('CDC_SHOW_BONUS_LIST');
    navigate(APP_ROUTES.BONUS_LIST);
  }, [navigate]);

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

  useEffect(() => {
    if (deleted) {
      showToast({
        message: 'Hai annullato il buono',
        messageType: 'success',
        onClose: () => {
          dispatch(ticketsActions.setDeleted(false));
        },
        onOpen: () => trackWebviewEvent('CDC_BONUS_CANCELLATION_SUCCESS'),
      });
    }
  }, []);

  if (!isFulfilled)
    return (
      <Stack height="100dvh" flex={1} justifyContent="center" alignItems="center" rowGap={2}>
        <Loader />
      </Stack>
    );

  if (!cards) return <div>no data</div>;

  return (
    <Stack justifyContent="center" alignItems="center" paddingInline={2}>
      <Carousel list={cards} />
      <Typography sx={{ fontSize: 12, marginBottom: 2 }} color={theme.palette.text.secondary}>
        {lastUpdateLabel}
      </Typography>
      <Reminder />
      <Stack width="100%" paddingInline={2} gap={4}>
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

        <Stack gap={2}>
          <Button variant="contained" onClick={onClickBonus}>
            Genera buono
          </Button>
          <Button variant="text" onClick={onClickBRetailers}>
            Mostra esercenti
          </Button>
        </Stack>
      </Stack>

      <OthersBonusSheet openSheet={openSheet} onClose={() => setOpenSheet([false, false])} />
    </Stack>
  );
};

export default Home;
