import { Stack } from '@mui/system';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Header } from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { PopConfirm } from '../../components/PopConfirm';
import { APP_ROUTES } from '../../utils/appRoutes';
import { useGetCardsQuery } from '../../features/app/services';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { RadioList } from './components/RadioList';
import { ticketsActions } from '../../features/app/reducers';
import { useDispatch } from 'react-redux';

const GenerateTicket = () => {
  const dispatch = useDispatch();
  const { data: cards } = useGetCardsQuery();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const cardOptions = useMemo(() => {
    if (!cards) return [];
    return cards.map(({ residual_amount, year }) => ({ residual_amount, year }));
  }, [cards]);

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

  return (
    <Stack p={3} gap={3}>
      <Header onBack={onBackHeader} />
      <RadioList cards={cardOptions} />
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
