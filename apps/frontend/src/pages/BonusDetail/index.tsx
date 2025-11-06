import { Button, Chip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Icon, Loader, theme } from '@io-cdc/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BonusDescription } from './components/BonusDescription';
import { Footer } from './components/Footer';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { VOUCHER_STATUS } from '../../features/app/model';
import { DetailItemWrapper } from './components/DetailItems';
import { MerchantDetail } from './components/MerchantDetail';
import { useGetVoucherDetail } from '../../hooks/useGetVoucherDetail';
import { useDeleteVoucherMutation } from '../../features/app/services';
import { PopConfirm } from '../../components/PopConfirm';
import { useDispatch } from 'react-redux';
import { ticketsActions } from '../../features/app/reducers';
import { APP_ROUTES } from '../../routes/appRoutes';
import { getChipConfig } from './constants';
import { useRouteGuard } from '../../hooks';

const BonusDetail = () => {
  //TODO test only
  useRouteGuard();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { state } = useLocation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    voucherDetail,
    isLoading: detailLoading,
    error,
    isError,
    isSuccess,
  } = useGetVoucherDetail({ id });

  const [deleteBonus, { isSuccess: isBonusDeleteSuccess, isLoading: deleteLoading }] =
    useDeleteVoucherMutation();

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

  const chipConfig = useMemo(() => getChipConfig(refund, spent), [refund, spent]);

  const onClickDeleteBonus = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_CANCEL');
    setIsDialogOpen(true);
  }, []);

  const onDeleteBonus = useCallback(() => {
    deleteBonus(id);
  }, [id, deleteBonus]);

  const onStopDeleteBonus = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_CANCELLATION_BACK');
    setIsDialogOpen(false);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      if (state?.generating) {
        trackWebviewEvent('CDC_BONUS_GENERATION_SUCCESS', { event_category: 'TECH' });
      }

      trackWebviewEvent('CDC_BONUS_DETAIL', {
        bonus_status: spent ? 'spent' : 'to spend',
      });
    }
  }, [error, isError, isSuccess, spent, state?.generating]);

  if (isBonusDeleteSuccess) {
    dispatch(ticketsActions.setDeleted(true));
    trackWebviewEvent('CDC_BONUS_CANCELLATION_CONFIRM');
    return <Navigate to={APP_ROUTES.HOME} />;
  }

  if (detailLoading)
    return (
      <Stack height="100dvh" flex={1} justifyContent="center" alignItems="center" rowGap={2}>
        <Loader />
        <Typography fontSize={22} fontWeight={700} textAlign="center">
          Stiamo recuperando il tuo buono
        </Typography>
        <Typography textAlign="center">Attendi qualche secondo</Typography>
      </Stack>
    );

  if (deleteLoading)
    return (
      <Stack height="100dvh" flex={1} justifyContent="center" alignItems="center" rowGap={2}>
        <Loader />
        <Typography fontSize={22} fontWeight={700} textAlign="center">
          Operazione in corso
        </Typography>
        <Typography textAlign="center">Attendi qualche secondo</Typography>
      </Stack>
    );

  if (!voucherDetail) return <></>;

  return (
    <Stack p={3} gap={3}>
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

      {pending && (
        <>
          <Button
            variant="text"
            onClick={onClickDeleteBonus}
            startIcon={<Icon name="close" sx={{ width: 18, height: 18 }} />}
            color="error"
            sx={{
              padding: 0,
              justifyContent: 'start',
            }}
          >
            <Typography variant="body1" fontWeight={700} color="inherit">
              Annulla il buono
            </Typography>
          </Button>
          <Footer code={voucherDetail.id} />
        </>
      )}

      <PopConfirm
        isOpen={isDialogOpen}
        onOpen={() => trackWebviewEvent('CDC_BONUS_CANCELLATION')}
        description="Se prosegui, l’importo del buono tornerà disponibile"
        title="Vuoi davvero annullare il buono?"
        buttonConfirm={{
          title: 'ANNULLA BUONO',
          onClick: onDeleteBonus,
        }}
        buttonClose={{
          title: 'TORNA INDIETRO',
          onClick: onStopDeleteBonus,
        }}
      />
    </Stack>
  );
};

export default BonusDetail;
