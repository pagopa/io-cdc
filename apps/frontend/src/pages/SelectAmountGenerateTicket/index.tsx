import { Stack } from '@mui/system';
import { useCallback, useEffect, useMemo } from 'react';
import { Header } from '../../components/Header';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { SetAmount } from './components/SetAmount';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useCreateBonusMutation } from '../../features/app/services';
import { useSelector } from 'react-redux';
import { selectAmountBonus, selectSelectedCardBonus } from '../../features/app/selectors';
import { APP_ROUTES } from '../../utils/appRoutes';
import { BonusCreationLoader } from './components/BonusCreationLoader';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';

const TEXT_COLOR = '#5C6F82';

const SelectAmountGenerateTicket = () => {
  const navigate = useNavigate();

  const [
    createBonus,
    {
      isLoading: isCreatingBonus,
      isSuccess: isBonusCreationCompleted,
      data: newBonus,
      isError,
      error: creationError,
    },
  ] = useCreateBonusMutation();

  const selectedCard = useSelector(selectSelectedCardBonus);

  const amount = useSelector(selectAmountBonus);

  const required = useMemo(() => !amount || amount === '0', [amount]);

  const error = useMemo(
    () => selectedCard?.balance! < Number(amount) || required,
    [amount, required, selectedCard?.balance],
  );

  const onBackHeader = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_GENERATION_BACK', {
      screen: 'CDC_BONUS_AMOUNT_INSERT',
    });
    navigate(-1);
  }, [navigate]);

  const onClickBottom = useCallback(async () => {
    if (required || error || !amount) return;
    trackWebviewEvent('CDC_BONUS_GENERATION_CONVERSION');
    await createBonus({ year: selectedCard?.year!, amount: Number(amount) });
    navigate(APP_ROUTES.HOME);
  }, [amount, createBonus, error, navigate, required, selectedCard?.year]);

  useEffect(() => {
    trackWebviewEvent('CDC_BONUS_AMOUNT_INSERT');
  }, []);

  if (isError && isFetchBaseQueryError(creationError)) {
    return (
      <Navigate
        to={APP_ROUTES.TICKET_FEEDBACK}
        state={{ status: creationError.status, name: 'CDC_BONUS_GENERATION_ERROR' }}
        replace
      />
    );
  }

  if (isBonusCreationCompleted && newBonus) {
    console.log(isError, isFetchBaseQueryError(creationError), 'aihsidhiash');
    trackWebviewEvent('CDC_BONUS_GENERATION_SUCCESS', { event_category: 'TECH' });
    return <Navigate to={`/dettaglio-buono/${newBonus}`} />;
  }

  if (isCreatingBonus) return <BonusCreationLoader />;

  return (
    <Stack p={4} height="100dvh">
      <Header onBack={onBackHeader} />
      <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
        <Stack gap={2}>
          <Stack gap={2}>
            <Typography variant="h2">{"Inserisci l'importo"}</Typography>
            <Typography color={TEXT_COLOR} fontSize={16}>
              {`Puoi generare un buono con un valore massimo di ${selectedCard?.balance} €`}
            </Typography>
          </Stack>
          <Stack>
            <SetAmount
              amount={amount}
              balance={selectedCard?.balance}
              error={error}
              required={required}
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
