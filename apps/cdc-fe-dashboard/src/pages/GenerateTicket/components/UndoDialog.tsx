import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../utils/appRoutes';

export const UndoDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button variant="text" onClick={() => setIsDialogOpen(true)}>
        Annulla
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Vuoi interrompere l&apos;operazione?</DialogTitle>
        <DialogActions
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
          }}
        >
          <Button onClick={() => navigate(APP_ROUTES.HOME)} color="error">
            SI, INTERROMPI
          </Button>
          <Button onClick={() => setIsDialogOpen(false)} autoFocus>
            TORNA INDIETRO
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
