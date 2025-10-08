import { Stack } from '@mui/system';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Header } from '../../components/Header';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { SetAmount } from './components/SetAmount';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useCreateVoucherMutation } from '../../features/app/services';
import { useDispatch, useSelector } from 'react-redux';
import { selectAmountBonus, selectSelectedCardBonus } from '../../features/app/selectors';
import { APP_ROUTES } from '../../utils/appRoutes';
import { BonusCreationLoader } from './components/BonusCreationLoader';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';
import { ticketsActions } from '../../features/app/reducers';
import { useToast } from '../../contexts';
import { theme } from '@io-cdc/ui';

const SelectAmountGenerateTicket = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(false);

  const [
    createBonus,
    {
      isLoading: isCreatingBonus,
      isSuccess: isBonusCreationCompleted,
      data: newVoucher,
      isError,
      error: creationError,
    },
  ] = useCreateVoucherMutation();

  const selectedCard = useSelector(selectSelectedCardBonus);

  const amount = useSelector(selectAmountBonus);

  const required = useMemo(() => !amount || amount === '0', [amount]);

  const onBackHeader = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_GENERATION_BACK', {
      screen: 'CDC_BONUS_AMOUNT_INSERT',
    });
    navigate(-1);
  }, [navigate]);

  const onClickBottom = useCallback(async () => {
    if (required || selectedCard?.residual_amount! < Number(amount)) {
      const helperText =
        selectedCard?.residual_amount < Number(amount)
          ? 'L’ importo è superiore al credito disponibile'
          : 'Inserisci un importo';
      showToast({
        message: helperText,
        messageType: 'error',
      });
      setError(true);
      return;
    }
    trackWebviewEvent('CDC_BONUS_GENERATION_CONVERSION');
    await createBonus({ card_year: selectedCard?.year!, amount: Number(amount) });
    dispatch(ticketsActions.resetForm());
    navigate(APP_ROUTES.HOME);
  }, [
    amount,
    createBonus,
    dispatch,
    navigate,
    required,
    selectedCard?.residual_amount,
    selectedCard?.year,
    showToast,
  ]);

  useEffect(() => {
    trackWebviewEvent('CDC_BONUS_AMOUNT_INSERT');
    return () => {
      dispatch(ticketsActions.setAmount(''));
    };
  }, [dispatch]);

  if (isError && isFetchBaseQueryError(creationError)) {
    return (
      <Navigate
        to={APP_ROUTES.FEEDBACK_VOUCHERS}
        state={{ status: creationError.status, name: 'CDC_BONUS_GENERATION_ERROR' }}
        replace
      />
    );
  }

  if (isBonusCreationCompleted && newVoucher?.id) {
    trackWebviewEvent('CDC_BONUS_GENERATION_SUCCESS', { event_category: 'TECH' });
    return <Navigate to={`/dettaglio-buono/${newVoucher.id}`} />;
  }

  if (isCreatingBonus) return <BonusCreationLoader />;

  return (
    <Stack p={3} gap={3}>
      <Header onBack={onBackHeader} />
      <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
        <Stack gap={2}>
          <Stack gap={2}>
            <Typography variant="h2">{"Inserisci l'importo"}</Typography>
            <Typography color={theme.palette.text.secondary} fontSize={16}>
              {`Puoi generare un buono con un valore massimo di ${selectedCard?.residual_amount} €`}
            </Typography>
          </Stack>
          <Stack>
            <SetAmount
              amount={amount}
              error={error}
              reset={() => setError(false)}
              // balance={selectedCard?.residual_amount}
              // required={required}
            />
          </Stack>
        </Stack>
        <Stack width="100%" justifySelf="end">
          <Button variant="contained" onClick={onClickBottom}>
            Continua
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default SelectAmountGenerateTicket;
