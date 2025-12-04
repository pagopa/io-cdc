import { Stack } from '@mui/system';
import { Header, VoucherList, VoucherListError } from '../../components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { APP_ROUTES } from '../../routes/appRoutes';
import { useRouteGuard } from '../../hooks';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { useGetAllVoucherQuery } from '../../features/app/services';

const BonusList = () => {
  //TODO test only
  useRouteGuard();

  const { data: vouchers, isError, isFetching, refetch } = useGetAllVoucherQuery();

  const navigate = useNavigate();

  useEffect(() => {
    trackWebviewEvent('CDC_BONUS_LIST');
  }, []);

  if (isFetching)
    return (
      <Stack height="100dvh" flex={1} justifyContent="center" alignItems="center" rowGap={2}>
        <CircularProgress />
        <Typography fontSize={22} fontWeight={700} textAlign="center">
          Stiamo recuperando i tuoi buoni
        </Typography>
        <Typography textAlign="center">Attendi qualche secondo</Typography>
      </Stack>
    );

  return (
    <Stack p={3} gap={3} height="100%">
      <Header onBack={() => navigate(APP_ROUTES.HOME)} />
      {isError ? (
        <Stack height="100%" justifyContent="center" alignItems="center">
          <VoucherListError reload={() => refetch()} />
        </Stack>
      ) : (
        <VoucherList vouchersList={vouchers ?? []} />
      )}
    </Stack>
  );
};

export default BonusList;
