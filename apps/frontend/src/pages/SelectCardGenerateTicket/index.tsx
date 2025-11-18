import { Stack } from '@mui/system';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Header, PopConfirm } from '../../components';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes/appRoutes';
import { useGetCardsQuery } from '../../features/app/services';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { RadioList } from '../../components';
import { ticketsActions } from '../../features/app/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteGuard } from '../../hooks';
import { selectSelectedCardBonus } from '../../features/app/selectors';
import { useToast } from '../../contexts';
import { Loader } from '@io-cdc/ui';

const GenerateTicket = () => {
  //TODO test only
  useRouteGuard();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const selectedCard = useSelector(selectSelectedCardBonus);

  const { data: cards, isFetching } = useGetCardsQuery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const cardOptions = useMemo(() => {
    if (!cards) return [];
    return cards.map(({ residual_amount, year }) => ({
      label: `Carta della Cultura ${year}`,
      subLabel: `Credito disponibile ${residual_amount?.toFixed(2)}€`,
      id: year,
      value: year,
    }));
  }, [cards]);

  const onRadioSelect = useCallback(
    (selectedYear: string) => {
      dispatch(
        ticketsActions.setSelectedCard({
          year: selectedYear,
          residual_amount: cards?.find(({ year }) => year === selectedYear)?.residual_amount ?? 0,
        }),
      );
    },
    [cards, dispatch],
  );

  const onRadioSubmit = useCallback(() => {
    if (!selectedCard.year) {
      showToast({
        messageType: 'error',
        message: "Scegli un'opzione per continuare",
      });
      return;
    }
    trackWebviewEvent('CDC_BONUS_CARD_SELECTED');
    navigate(APP_ROUTES.SELECT_TYPE);
  }, [navigate, showToast, selectedCard]);

  const onBackHeader = useCallback(() => {
    setIsDialogOpen(true);
    trackWebviewEvent('CDC_BONUS_GENERATION_BACK', {
      screen: 'CDC_CARD_SELECTION',
    });
  }, []);

  const stopCreation = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_GENERATION_EXIT_CONFIRM');
    dispatch(ticketsActions.resetForm());
    navigate(APP_ROUTES.HOME);
  }, [dispatch, navigate]);

  const backToCreation = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_GENERATION_EXIT_BACK');
    setIsDialogOpen(false);
  }, []);

  const showCloseModal = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_GENERATION_EXIT_REQUEST');
  }, []);

  useEffect(() => {
    trackWebviewEvent('CDC_CARD_SELECTION');
  }, [dispatch]);

  if (isFetching)
    return (
      <Stack flex={1} justifyContent="center" alignItems="center" rowGap={2}>
        <Loader />
      </Stack>
    );

  return (
    <Stack p={3} gap={3} flex={1}>
      <Header onBack={onBackHeader} />
      <RadioList
        title="Scegli la Carta da usare"
        subTitle="Seleziona la carta che vuoi usare per generare il buono"
        onSelect={onRadioSelect}
        onSubmit={onRadioSubmit}
        options={cardOptions}
        value={selectedCard.year}
      />
      <PopConfirm
        isOpen={isDialogOpen}
        onOpen={showCloseModal}
        title="Vuoi interrompere l'operazione?"
        buttonConfirm={{
          title: 'SI, INTERROMPI',
          onClick: stopCreation,
        }}
        buttonClose={{
          title: 'TORNA INDIETRO',
          onClick: backToCreation,
        }}
      />
    </Stack>
  );
};

export default GenerateTicket;
