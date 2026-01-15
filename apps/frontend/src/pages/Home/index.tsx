import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { Carousel, OthersBonusSheet, StickyContainer } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { APP_ROUTES } from '../../routes/appRoutes';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { theme } from '@io-cdc/ui';
import { useDispatch, useSelector } from 'react-redux';
import { selectTicketDeleted } from '../../features/reducers/usage/selectors';
import { ticketsActions } from '../../features/reducers/usage/reducers';
import { useToast } from '../../contexts';
import { useGetCards } from '../../hooks';
import { VoucherListHome } from './components/VoucherListHome';

const Home = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const deleted = useSelector(selectTicketDeleted);

  const { cards, isSuccess, isError } = useGetCards();

  const isFulfilled = isSuccess || isError;

  const hasPlafond = useMemo(
    () => cards.some(({ residual_amount }) => residual_amount > 0),
    [cards],
  );

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

  const bannerConfig = useMemo(() => {
    if (!deleted) return undefined;
    const success = deleted === 'success';
    return {
      message: success
        ? 'Hai annullato il buono'
        : 'Non è stato possibile annullare il buono, riprova',
      messageType: deleted,
      onOpen: () =>
        trackWebviewEvent(
          success ? 'CDC_BONUS_CANCELLATION_SUCCESS' : 'CDC_BONUS_CANCELLATION_ERROR',
          { event_category: success ? 'UX' : 'KO', event_type: success ? 'screen_view' : 'error' },
        ),
    };
  }, [deleted]);

  const onClickShowAll = useCallback(() => {
    trackWebviewEvent('CDC_SHOW_BONUS_LIST');
    navigate(APP_ROUTES.BONUS_LIST);
  }, [navigate]);

  const onClickBonus = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_GENERATION_START');
    if (!hasPlafond) return navigate(APP_ROUTES.FEEDBACK_OOC);
    navigate(APP_ROUTES.SELECT_CARD);
  }, [hasPlafond, navigate]);

  useEffect(() => {
    if (!cards.length) return;
    trackWebviewEvent('CDC_CARD_DETAIL');
  }, [cards]);

  useEffect(() => {
    if (bannerConfig && isFulfilled) {
      showToast({
        ...bannerConfig,
        onClose: () => {
          dispatch(ticketsActions.setDeleted(undefined));
        },
      });
    }
  }, [isFulfilled]);

  if (!isFulfilled)
    return (
      <Stack height="100dvh" flex={1} justifyContent="center" alignItems="center" rowGap={2}>
        <CircularProgress />
      </Stack>
    );

  return (
    <>
      <Stack justifyContent="center" alignItems="center" paddingInline={2}>
        <Carousel list={cards} />
        <Typography sx={{ fontSize: 12, marginBottom: 2 }} color={theme.palette.text.secondary}>
          {lastUpdateLabel}
        </Typography>
        <Stack width="100%" paddingInline={2} gap={4} mb={3}>
          <VoucherListHome onClickShowAll={onClickShowAll} setOpenSheet={setOpenSheet} />
        </Stack>
        <OthersBonusSheet openSheet={openSheet} onClose={() => setOpenSheet([false, false])} />
      </Stack>
      <StickyContainer>
        <Button variant="contained" onClick={onClickBonus}>
          Genera buono
        </Button>
      </StickyContainer>
    </>
  );
};

export default Home;
