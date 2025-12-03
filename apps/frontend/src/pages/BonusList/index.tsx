import { Stack } from '@mui/system';
import { Header, VoucherList, VoucherListError } from '../../components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { APP_ROUTES } from '../../routes/appRoutes';
import { useRouteGuard } from '../../hooks';
import { EmptyState } from '@io-cdc/ui';
import { Button, Typography } from '@mui/material';
import { useGetAllVouchers } from '../../hooks/useGetAllVouchers';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

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
        <CircularProgress />
        <Typography fontSize={22} fontWeight={700} textAlign="center">
          Stiamo recuperando i tuoi buoni
        </Typography>
        <Typography textAlign="center">Attendi qualche secondo</Typography>
      </Stack>
    );

  if (isError) return <VoucherListError reload={() => getVouchers()} />;

  return (
    <Stack p={3} gap={3}>
      <Header onBack={() => navigate(APP_ROUTES.HOME)} />
      <VoucherList vouchersList={vouchers} />
    </Stack>
  );
};

export default BonusList;
