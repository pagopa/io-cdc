import { Stack } from '@mui/system';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Header } from '../../components';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { SetAmount } from './components/SetAmount';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useCreateVoucherMutation } from '../../features/app/services';
import { useDispatch, useSelector } from 'react-redux';
import { selectAmountBonus, selectSelectedCardBonus } from '../../features/app/selectors';
import { APP_ROUTES } from '../../routes/appRoutes';
import { BonusCreationLoader } from './components/BonusCreationLoader';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';
import { ticketsActions } from '../../features/app/reducers';
import { theme } from '@io-cdc/ui';
import { useRouteGuard } from '../../hooks';
import { formatDecimals } from '../../utils/formatDecimals';

const convertAmount = (amount: string | undefined): number =>
  Number(parseFloat(amount?.replace(',', '.') ?? '0').toFixed(2));

const SelectAmountGenerateTicket = () => {
  //TODO test only
  useRouteGuard();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState<string | null>(null);

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
    dispatch(ticketsActions.setAmount(undefined));
    navigate(-1);
  }, [dispatch, navigate]);

  const onClickBottom = useCallback(async () => {
    if (required || selectedCard?.residual_amount! < convertAmount(amount)) {
      const helperText =
        selectedCard?.residual_amount < convertAmount(amount)
          ? 'L’ importo è superiore al credito disponibile'
          : 'Inserisci un importo';
      setHelperText(helperText);
      setError(true);
      return;
    }
    trackWebviewEvent('CDC_BONUS_GENERATION_CONVERSION');
    await createBonus({
      year: selectedCard?.year!,
      amount: convertAmount(amount),
    });
    dispatch(ticketsActions.resetForm());
  }, [amount, createBonus, dispatch, required, selectedCard]);

  const onResetField = useCallback(() => {
    setHelperText(null);
    setError(false);
  }, []);

  useEffect(() => {
    trackWebviewEvent('CDC_BONUS_AMOUNT_INSERT');
  }, [dispatch]);

  if (isError && isFetchBaseQueryError(creationError)) {
    if (creationError.status === 401) return <Navigate to={APP_ROUTES.UNAUTHORIZED} replace />;
    if (creationError.status === 403) return <Navigate to={APP_ROUTES.EXPIRED_USAGE} replace />;
    return (
      <Navigate
        to={APP_ROUTES.FEEDBACK_VOUCHERS}
        state={{ status: 503, name: 'CDC_BONUS_GENERATION_ERROR' }}
        replace
      />
    );
  }

  if (isBonusCreationCompleted && newVoucher?.id)
    return <Navigate to={`/dettaglio-buono/${newVoucher.id}`} state={{ generating: true }} />;

  if (isCreatingBonus) return <BonusCreationLoader />;

  return (
    <Stack p={3} gap={3} flex={1}>
      <Header onBack={onBackHeader} />
      <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
        <Stack gap={2}>
          <Stack gap={2}>
            <Typography variant="h4">{"Inserisci l'importo"}</Typography>
            <Typography color={theme.palette.text.secondary} fontSize={18}>
              {`Puoi generare un buono con un valore massimo di ${formatDecimals(
                selectedCard?.residual_amount,
              )} €`}
            </Typography>
          </Stack>
          <Stack>
            <SetAmount amount={amount} error={error} helperText={helperText} reset={onResetField} />
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
