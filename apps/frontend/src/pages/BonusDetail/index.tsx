import { Chip, ChipProps, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Icon, Loader } from '@io-cdc/ui';
import { useEffect } from 'react';
import { BonusDescription } from './components/BonusDescription';
import { Footer } from './components/Footer';
import { APP_ROUTES } from '../../utils/appRoutes';
import { useGetVoucherByIdQuery } from '../../features/app/services';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';
import { REFUND_STATUS, VOUCHER_STATUS } from '../../features/app/model';

const BonusDetail = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { data: bonusDetail, isLoading, error, isError } = useGetVoucherByIdQuery(id);

  const spent =
    bonusDetail?.status === VOUCHER_STATUS.USED || bonusDetail?.status === VOUCHER_STATUS.REFUNDED;

  const pending = bonusDetail?.status === VOUCHER_STATUS.PENDING;

  const refund = bonusDetail?.refund;

  const refundCompleted = refund?.status === REFUND_STATUS.COMPLETED;

  const chipConfig = {
    label: refundCompleted
      ? 'COMPLETATO'
      : refund?.status === REFUND_STATUS.PENDING
        ? 'IN CORSO'
        : refund?.status === REFUND_STATUS.FAILED
          ? 'NEGATO'
          : spent
            ? 'SPESO'
            : 'DA SPENDERE',
    color: (refundCompleted
      ? 'success'
      : refund?.status === REFUND_STATUS.FAILED
        ? 'error'
        : refund
          ? 'warning'
          : spent
            ? 'info'
            : 'primary') as ChipProps['color'],
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
          <BonusDescription pending={pending} />
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
        {!refund && <Chip {...chipConfig} size="small" sx={{ fontSize: 14 }} />}
      </Stack>
      <Divider />

      {bonusDetail?.refund && (
        <>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack>
              <Typography color="#5C6F82">Da riaccreditare</Typography>
              <Typography fontWeight={600} fontSize={18}>
                {bonusDetail.refund.amount.toFixed(2)} €
              </Typography>
            </Stack>
            <Chip {...chipConfig} size="small" sx={{ fontSize: 14 }} />
          </Stack>
          <Divider />
        </>
      )}

      <Stack>
        <Typography color="#5C6F82">{spent ? 'Speso' : 'Scade'} il</Typography>
        <Typography fontWeight={600} fontSize={18}>
          {bonusDetail.expiration_date}
        </Typography>
      </Stack>
      <Divider />
      <Stack>
        <Typography color="#5C6F82">Carta della cultura usata</Typography>
        <Typography fontWeight={600} fontSize={18}>
          {bonusDetail.card_year}
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
          {bonusDetail.merchant}
        </Typography>
        {/** TODO placeholder!!! this must be the date voucher was spent */}
        <Typography>{bonusDetail.expiration_date}</Typography>
      </Stack>
      {pending && <Footer bonusId={id} code={bonusDetail.id} />}
    </Stack>
  ) : (
    <>not found</>
  );
};

export default BonusDetail;
