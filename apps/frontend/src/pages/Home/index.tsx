import { Button, Stack, Typography } from '@mui/material';
import { Carousel, OthersBonusSheet } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { APP_ROUTES } from '../../routes/appRoutes';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { Loader, theme } from '@io-cdc/ui';
import { useDispatch, useSelector } from 'react-redux';
import { selectTicketDeleted } from '../../features/app/selectors';
import { ticketsActions } from '../../features/app/reducers';
import { useToast } from '../../contexts';
import { Reminder } from './components/Reminder';
import { useGetCards, useRouteGuard } from '../../hooks';
import { VoucherListHome } from './components/VoucherListHome';

const Home = () => {
  //TODO test only
  useRouteGuard();

  const dispatch = useDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const deleted = useSelector(selectTicketDeleted);

  const { cards, isSuccess, isError } = useGetCards();

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

  const onClickShowAll = useCallback(() => {
    trackWebviewEvent('CDC_SHOW_BONUS_LIST');
    navigate(APP_ROUTES.BONUS_LIST);
  }, [navigate]);

  const onClickBonus = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_GENERATION_START');
    navigate(APP_ROUTES.SELECT_CARD);
  }, [navigate]);

  const onClickBRetailers = useCallback(() => {
    trackWebviewEvent('CDC_CARD_SHOW_RETAILERS');
    window.location.replace(import.meta.env.VITE_LINK_RETAILERS);
  }, []);

  useEffect(() => {
    if (!cards.length) return;
    trackWebviewEvent('CDC_CARD_DETAIL');
  }, [cards]);

  useEffect(() => {
    if (deleted && isFulfilled) {
      showToast({
        message: 'Hai annullato il buono',
        messageType: 'success',
        onClose: () => {
          dispatch(ticketsActions.setDeleted(false));
        },
        onOpen: () => trackWebviewEvent('CDC_BONUS_CANCELLATION_SUCCESS'),
      });
    }
  }, [isFulfilled]);

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
        <VoucherListHome onClickShowAll={onClickShowAll} setOpenSheet={setOpenSheet} />

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
