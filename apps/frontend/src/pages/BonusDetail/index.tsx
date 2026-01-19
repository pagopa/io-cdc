import { Button, Chip, CircularProgress, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Header, PopConfirm } from '../../components';
import { Icon, theme } from '@io-cdc/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BonusDescription } from './components/BonusDescription';
import { Footer } from './components/Footer';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { VOUCHER_STATUS } from '../../features/types/model';
import { DetailItemWrapper } from './components/DetailItems';
import { MerchantDetail } from './components/MerchantDetail';
import { useGetVoucherDetail } from '../../hooks/useGetVoucherDetail';
import { useDeleteVoucherMutation } from '../../features/rtk/services';
import { useDispatch } from 'react-redux';
import { ticketsActions } from '../../features/reducers/usage/reducers';
import { APP_ROUTES } from '../../routes/appRoutes';
import { getChipConfig } from './constants';
import { formatDecimals } from '../../utils/formatDecimals';
import { Reminder } from '../Home/components/Reminder';

const BonusDetail = () => {
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

  const [deleteBonus, { isLoading: deleteLoading }] = useDeleteVoucherMutation();

  const spent = useMemo(
    () =>
      voucherDetail?.voucher_status === VOUCHER_STATUS.USED ||
      voucherDetail?.voucher_status === VOUCHER_STATUS.REFUNDED,
    [voucherDetail?.voucher_status],
  );

  const pending = useMemo(
    () => voucherDetail?.voucher_status === VOUCHER_STATUS.PENDING,
    [voucherDetail?.voucher_status],
  );

  const refund = useMemo(() => voucherDetail?.refund, [voucherDetail?.refund]);

  const chipConfig = useMemo(() => getChipConfig(refund, spent), [refund, spent]);

  const showDeleteModal = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_CANCELLATION');
  }, []);

  const onClickDeleteBonus = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_CANCEL');
    setIsDialogOpen(true);
  }, []);

  const onDeleteBonus = useCallback(async () => {
    trackWebviewEvent('CDC_BONUS_CANCELLATION_CONFIRM');
    setIsDialogOpen(false);
    const res = await deleteBonus(id);
    if (res.error) {
      dispatch(ticketsActions.setDeleted('error'));
      return navigate(APP_ROUTES.HOME);
    }
    dispatch(ticketsActions.setDeleted('success'));
    navigate(APP_ROUTES.HOME);
  }, [deleteBonus, id, dispatch, navigate]);

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

  if (detailLoading)
    return (
      <Stack height="100dvh" flex={1} justifyContent="center" alignItems="center" rowGap={2}>
        <CircularProgress />
        <Typography fontSize={22} fontWeight={700} textAlign="center">
          Stiamo recuperando il tuo buono
        </Typography>
        <Typography textAlign="center">Attendi qualche secondo</Typography>
      </Stack>
    );

  if (deleteLoading)
    return (
      <Stack height="100dvh" flex={1} justifyContent="center" alignItems="center" rowGap={2}>
        <CircularProgress />
        <Typography fontSize={22} fontWeight={700} textAlign="center">
          Operazione in corso
        </Typography>
        <Typography textAlign="center">Attendi qualche secondo</Typography>
      </Stack>
    );

  if (!voucherDetail) return <></>;

  const spending_date = voucherDetail.spending_date
    ? new Date(voucherDetail.spending_date)
    : undefined;

  const expiration_date = new Date(voucherDetail.expiration_date);

  const formattedDate = spent
    ? spending_date &&
      spending_date.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : expiration_date.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: '2-digit',
        year: 'numeric',
      });

  const formattedMerchantDate = spent
    ? spending_date &&
      spending_date.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : expiration_date.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

  return (
    <>
      <Stack p={3} gap={3}>
        {!state?.generating && <Header onBack={() => navigate(-1)} />}

        <Stack>
          <Stack gap={2} mb={1}>
            <Typography variant="h2">Il tuo buono</Typography>
            <BonusDescription pending={pending} />
          </Stack>
        </Stack>

        {!spent && (
          <Reminder
            text={
              <>
                <strong>Fai attenzione alle truffe!</strong>
                <br />
                Non fornire i tuoi dati o quelli dei buoni generati al di fuori dei canali
                ufficiali.
              </>
            }
          />
        )}

        <Stack direction="row" gap={1} alignItems="center">
          <Icon name="ticket" sx={{ width: 24, height: 24 }} />
          <Typography fontWeight={700} fontSize={14}>
            DETTAGLI DEL BUONO
          </Typography>
        </Stack>

        <DetailItemWrapper chip={!refund && <Chip {...chipConfig} size="small" />}>
          <Typography color={theme.palette.text.secondary}>Importo</Typography>
          <Typography fontWeight={600} fontSize={18}>
            {`${spent ? '\u2013' : ''}${formatDecimals(voucherDetail.amount)}`} €
          </Typography>
        </DetailItemWrapper>

        {voucherDetail.refund && (
          <>
            <DetailItemWrapper chip={<Chip {...chipConfig} size="small" />}>
              <Typography color={theme.palette.text.secondary}>Da riaccreditare</Typography>
              <Typography fontWeight={600} fontSize={18}>
                {formatDecimals(voucherDetail.refund.amount)} €
              </Typography>
            </DetailItemWrapper>
          </>
        )}

        {formattedDate && (
          <DetailItemWrapper>
            <Typography color="#5C6F82">{spent ? 'Speso' : 'Scade'} il</Typography>
            <Typography fontWeight={600} fontSize={18}>
              {formattedDate}
            </Typography>
          </DetailItemWrapper>
        )}

        <DetailItemWrapper last>
          <Typography color={theme.palette.text.secondary}>Carta della cultura usata</Typography>
          <Typography fontWeight={600} fontSize={18}>
            {voucherDetail.card_year}
          </Typography>
        </DetailItemWrapper>

        <MerchantDetail merchant={voucherDetail.merchant} usage_date={formattedMerchantDate} />

        {pending && (
          <Button
            variant="text"
            onClick={onClickDeleteBonus}
            startIcon={<Icon name="close" color="inherit" sx={{ width: 18, height: 18 }} />}
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
        )}

        <PopConfirm
          isOpen={isDialogOpen}
          onOpen={showDeleteModal}
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
      {pending && <Footer code={voucherDetail.id} isGenerated={state?.generating} />}
    </>
  );
};

export default BonusDetail;
