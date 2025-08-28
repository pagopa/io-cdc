import { Stack } from '@mui/system';
import { Header } from '../../components/Header';
import { BonusList as BonusListComponent } from '../../components/BonusList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetBonusQuery } from '../../features/app/services';
import { trackWebviewEvent } from '../../utils/trackEvent';

const BonusList = () => {
  const { data: bonusList, isLoading, error } = useGetBonusQuery();
  const navigate = useNavigate();

  useEffect(() => {
    trackWebviewEvent('CDC_SHOW_BONUS_LIST');
  }, []);

  if (isLoading) return <>Loading...</>;
  if (error) return <>Errore</>;

  return bonusList ? (
    <Stack p={4} gap={3}>
      <Header onBack={() => navigate(-1)} />
      <BonusListComponent bonusList={bonusList} />
    </Stack>
  ) : (
    <>not found</>
  );
};

export default BonusList;
