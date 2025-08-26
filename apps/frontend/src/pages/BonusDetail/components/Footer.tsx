import { Icon } from '@io-cdc/ui';
import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { PopConfirm } from '../../../components/PopConfirm';
import { useState } from 'react';
import { useDeleteBonusMutation } from '../../../store/services/api';
import { APP_ROUTES } from '../../../utils/appRoutes';

type FooterProps = {
  bonusId: string;
};

export const Footer = ({ bonusId }: FooterProps) => {
  const [deleteBonus, { isSuccess: isBonusDeleteSuccess }] = useDeleteBonusMutation();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isBonusDeleteSuccess) {
    return <Navigate to={APP_ROUTES.BONUS_LIST} />;
  }
  return (
    <>
      <Button
        variant="text"
        onClick={() => setIsDialogOpen(true)}
        startIcon={<Icon name="close" sx={{ width: 11, height: 11 }} />}
        color="error"
        sx={{
          padding: 0,
          justifyContent: 'start',
        }}
      >
        Annulla buono
      </Button>
      <PopConfirm
        isOpen={isDialogOpen}
        description="Se prosegui, l’importo del buono tornerà disponibile"
        title="Vuoi davvero eliminare il buono?"
        buttonConfirm={{
          title: 'ANNULLA BUONO',
          onClick: () => deleteBonus(bonusId),
        }}
        buttonClose={{
          title: 'TORNA INDIETRO',
          onClick: () => setIsDialogOpen(false),
        }}
      />

      <Button variant="contained" onClick={() => navigate(-1)}>
        Chiudi
      </Button>
    </>
  );
};
