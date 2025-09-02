import { Icon } from '@io-cdc/ui';
import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { PopConfirm } from '../../../components/PopConfirm';
import { useCallback, useState } from 'react';
import { APP_ROUTES } from '../../../utils/appRoutes';
import { useDeleteVoucherMutation } from '../../../features/app/services';
import { trackWebviewEvent } from '../../../utils/trackEvent';
import { useDispatch } from 'react-redux';
import { ticketsActions } from '../../../features/app/reducers';
import { UseCodeSheet } from './UseCodeSheet';

type FooterProps = {
  bonusId: string;
  code: string;
};

export const Footer = ({ bonusId, code }: FooterProps) => {
  const dispatch = useDispatch();

  const [deleteBonus, { isSuccess: isBonusDeleteSuccess }] = useDeleteVoucherMutation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onClickUseBonus = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_SHOW_CODE');
    setIsOpen(true);
  }, []);

  const onClickDeleteBonus = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_CANCEL');
    setIsDialogOpen(true);
  }, []);

  const onDeleteBonus = useCallback(() => {
    deleteBonus(bonusId);
  }, [bonusId, deleteBonus]);

  const onStopDeleteBonus = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_CANCELLATION_BACK');
    setIsDialogOpen(false);
  }, []);

  if (isBonusDeleteSuccess) {
    dispatch(ticketsActions.setDeleted(true));
    trackWebviewEvent('CDC_BONUS_CANCELLATION_CONFIRM');
    return <Navigate to={APP_ROUTES.HOME} />;
  }
  return (
    <>
      <Button
        variant="text"
        onClick={onClickDeleteBonus}
        startIcon={<Icon name="close" sx={{ width: 11, height: 11 }} />}
        color="error"
        sx={{
          padding: 0,
          justifyContent: 'start',
        }}
      >
        Annulla il buono
      </Button>
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
      <Button variant="contained" onClick={onClickUseBonus}>
        Usa il buono
      </Button>

      <Button variant="text" onClick={() => navigate(-1)}>
        Chiudi
      </Button>

      <UseCodeSheet code={code} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
