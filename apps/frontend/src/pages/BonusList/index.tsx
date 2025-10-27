import { Stack } from '@mui/system';
import { Header } from '../../components/Header';
import { VoucherList } from '../../components/BonusList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetVoucherQuery } from '../../features/app/services';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { APP_ROUTES } from '../../utils/appRoutes';
import { useRouteGuard } from '../../hooks';

const BonusList = () => {
  //TODO test only
  useRouteGuard();

  const { data: voucherList, isLoading, error } = useGetVoucherQuery();
  const navigate = useNavigate();

  useEffect(() => {
    trackWebviewEvent('CDC_BONUS_LIST');
  }, []);

  if (isLoading) return <>Loading...</>;
  if (error) return <>Errore</>;

  return voucherList ? (
    <Stack p={3} gap={3}>
      <Header onBack={() => navigate(APP_ROUTES.HOME)} />
      <VoucherList vouchersList={voucherList} />
    </Stack>
  ) : (
    <>not found</>
  );
};

export default BonusList;
