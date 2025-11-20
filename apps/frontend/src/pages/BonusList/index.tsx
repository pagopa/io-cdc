import { Stack } from '@mui/system';
import { Header, VerboseLoader, VoucherList } from '../../components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { APP_ROUTES } from '../../routes/appRoutes';
import { useRouteGuard } from '../../hooks';
import { EmptyState } from '@io-cdc/ui';
import { Button } from '@mui/material';
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

  if (isLoading) return <VerboseLoader title="Stiamo recuperando i tuoi buoni" />;

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
