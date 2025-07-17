import { Icon } from '@io-cdc/ui';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        startIcon={<Icon name="close" sx={{ width: 11, height: 11 }} />}
        color="error"
        sx={{
          padding: 0,
          justifyContent: 'start',
        }}
      >
        Annulla buono
      </Button>

      <Button variant="contained" onClick={() => navigate(-1)}>
        Chiudi
      </Button>
    </>
  );
};
