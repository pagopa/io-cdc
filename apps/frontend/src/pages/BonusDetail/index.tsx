import { Chip, ChipProps, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Icon, Loader } from '@io-cdc/ui';
import { useEffect } from 'react';
import { BonusDescription } from './components/BonusDescription';
import { Footer } from './components/Footer';
import { APP_ROUTES } from '../../utils/appRoutes';
import { useGetBonusByIdQuery } from '../../features/app/services';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';

const BonusDetail = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { data: bonusDetail, isLoading, error, isError } = useGetBonusByIdQuery(id);

  const spent = !!bonusDetail?.spentDate;

  const chipConfig = {
    label: spent ? 'SPESO' : 'DA SPENDERE',
    color: (spent ? 'info' : 'primary') as ChipProps['color'],
  };

  useEffect(() => {
    if (isError && isFetchBaseQueryError(error)) {
      navigate(APP_ROUTES.TICKET_FEEDBACK, {
        state: { status: error.status, name: 'CDC_BONUS_SHOW_DETAIL_ERROR' },
        replace: true,
      });
      return;
    }
    trackWebviewEvent('CDC_BONUS_DETAIL', {
      bonus_status: spent ? 'spent' : 'to spend',
    });
  }, [error, isError, navigate, spent]);

  if (isLoading)
    return (
      <Stack height="100dvh" flex={1} justifyContent="center" alignItems="center" rowGap={2}>
        <Loader />
      </Stack>
    );

  return bonusDetail ? (
    <Stack p={4} gap={3}>
      <Header onBack={() => navigate(-1)} />
      <Stack gap={8}>
        <Stack gap={2}>
          <Typography variant="h2">Il tuo buono</Typography>
          <BonusDescription spent={spent} />
        </Stack>
      </Stack>
      <Stack direction="row" gap={1}>
        <Icon name="ticket" />
        <Typography fontWeight={700}>DETTAGLI DEL BUONO</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack>
          <Typography color="#5C6F82">Importo</Typography>
          <Typography fontWeight={600} fontSize={18}>
            {bonusDetail.amount.toFixed(2)} €
          </Typography>
        </Stack>
        <Chip {...chipConfig} size="small" sx={{ fontSize: 14 }} />
      </Stack>

      <Divider />
      <Stack>
        <Typography color="#5C6F82">{spent ? 'Speso' : 'Scade'} il</Typography>
        <Typography fontWeight={600} fontSize={18}>
          {bonusDetail.expireDate}
        </Typography>
      </Stack>
      <Divider />
      <Stack>
        <Typography color="#5C6F82">Carta della cultura usata</Typography>
        <Typography fontWeight={600} fontSize={18}>
          {bonusDetail.cardYear}
        </Typography>
      </Stack>
      <Stack direction="row" gap={2}>
        <Icon name="store" />
        <Typography fontWeight={700} fontSize={18}>
          ESERCENTE
        </Typography>
      </Stack>

      <Stack>
        <Typography fontWeight={700} fontSize={18}>
          {bonusDetail.merchant.name}
        </Typography>
        <Typography>{bonusDetail.merchant.date}</Typography>
      </Stack>
      {!spent && <Footer bonusId={id} code={bonusDetail.code} />}
    </Stack>
  ) : (
    <>not found</>
  );
};

export default BonusDetail;
