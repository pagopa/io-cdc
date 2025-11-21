import { Stack } from '@mui/system';
import { Header, VoucherList } from '../../components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { APP_ROUTES } from '../../routes/appRoutes';
import { useRouteGuard } from '../../hooks';
import { EmptyState, Loader } from '@io-cdc/ui';
import { Button, Typography } from '@mui/material';
import { useGetAllVouchers } from '../../hooks/useGetAllVouchers';

const BonusList = () => {
  //TODO test only
  useRouteGuard();

  const { vouchers, getVouchers, isError, isSuccess } = useGetAllVouchers();

  const isLoading = !isError && !isSuccess;
  const navigate = useNavigate();

  useEffect(() => {
    trackWebviewEvent('CDC_BONUS_LIST');
  }, []);

  if (isLoading)
    return (
      <Stack height="100dvh" flex={1} justifyContent="center" alignItems="center" rowGap={2}>
        <Loader />
        <Typography fontSize={22} fontWeight={700} textAlign="center">
          Stiamo recuperando i tuoi buoni
        </Typography>
        <Typography textAlign="center">Attendi qualche secondo</Typography>
      </Stack>
    );

  if (isError)
    return (
      <Stack minHeight={100} justifyContent="center">
        <EmptyState icon="info" title="Errore nel caricamento dei buoni" />
        <Button variant="text" onClick={() => getVouchers()}>
          Ricarica Lista Buoni
        </Button>
      </Stack>
    );

  return (
    <Stack p={3} gap={3}>
      <Header onBack={() => navigate(APP_ROUTES.HOME)} />
      <VoucherList vouchersList={vouchers} />
    </Stack>
  );
};

export default BonusList;
