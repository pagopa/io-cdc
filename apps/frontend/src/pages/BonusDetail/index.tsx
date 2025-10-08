import { Chip, ChipProps, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Icon, Loader, theme } from '@io-cdc/ui';
import { useEffect, useMemo } from 'react';
import { BonusDescription } from './components/BonusDescription';
import { Footer } from './components/Footer';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { REFUND_STATUS, VOUCHER_STATUS } from '../../features/app/model';
import { DetailItemWrapper } from './components/DetailItems';
import { MerchantDetail } from './components/MerchantDetail';
import { useGetVoucherDetail } from '../../hooks/useGetVoucherDetail';

const BonusDetail = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { voucherDetail, isLoading, error, isError, isSuccess } = useGetVoucherDetail({ id });

  const spent = useMemo(
    () =>
      voucherDetail?.status === VOUCHER_STATUS.USED ||
      voucherDetail?.status === VOUCHER_STATUS.REFUNDED,
    [voucherDetail?.status],
  );

  const pending = useMemo(
    () => voucherDetail?.status === VOUCHER_STATUS.PENDING,
    [voucherDetail?.status],
  );

  const refund = useMemo(() => voucherDetail?.refund, [voucherDetail?.refund]);

  const refundCompleted = useMemo(
    () => refund?.status === REFUND_STATUS.COMPLETED,
    [refund?.status],
  );

  const chipConfig = useMemo(
    () => ({
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
    }),
    [refund, refundCompleted, spent],
  );

  useEffect(() => {
    if (isSuccess) {
      trackWebviewEvent('CDC_BONUS_DETAIL', {
        bonus_status: spent ? 'spent' : 'to spend',
      });
    }
  }, [error, isError, isSuccess, spent]);

  if (isLoading)
    return (
      <Stack height="100dvh" flex={1} justifyContent="center" alignItems="center" rowGap={2}>
        <Loader />
      </Stack>
    );

  if (!voucherDetail) return <></>;

  return (
    <Stack py={4} px={3} gap={3}>
      <Header onBack={() => navigate(-1)} />

      <Stack>
        <Stack gap={2} mb={1}>
          <Typography variant="h2">Il tuo buono</Typography>
          <BonusDescription pending={pending} />
        </Stack>
      </Stack>

      <Stack direction="row" gap={1}>
        <Icon name="ticket" />
        <Typography fontWeight={700}>DETTAGLI DEL BUONO</Typography>
      </Stack>

      <DetailItemWrapper
        chip={!refund && <Chip {...chipConfig} size="small" sx={{ fontSize: 14 }} />}
      >
        <Typography color={theme.palette.text.secondary}>Importo</Typography>
        <Typography fontWeight={600} fontSize={18}>
          {voucherDetail.amount.toFixed(2)} €
        </Typography>
      </DetailItemWrapper>

      {voucherDetail.refund && (
        <>
          <DetailItemWrapper chip={<Chip {...chipConfig} size="small" sx={{ fontSize: 14 }} />}>
            <Typography color={theme.palette.text.secondary}>Da riaccreditare</Typography>
            <Typography fontWeight={600} fontSize={18}>
              {voucherDetail.refund.amount.toFixed(2)} €
            </Typography>
          </DetailItemWrapper>
        </>
      )}

      <DetailItemWrapper>
        <Typography color="#5C6F82">{spent ? 'Speso' : 'Scade'} il</Typography>
        <Typography fontWeight={600} fontSize={18}>
          {voucherDetail.expiration_date}
        </Typography>
      </DetailItemWrapper>

      <DetailItemWrapper last>
        <Typography color={theme.palette.text.secondary}>Carta della cultura usata</Typography>
        <Typography fontWeight={600} fontSize={18}>
          {voucherDetail.card_year}
        </Typography>
      </DetailItemWrapper>

      {/** expiration_date its a placeholder  */}
      <MerchantDetail
        merchant={voucherDetail.merchant}
        usage_date={voucherDetail.expiration_date}
      />
      {pending && <Footer bonusId={id} code={voucherDetail.id} />}
    </Stack>
  );
};

export default BonusDetail;
