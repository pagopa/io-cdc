import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { trackWebviewEvent } from '../../../utils/trackEvent';
import { UseCodeSheet } from './UseCodeSheet';
import { APP_ROUTES } from '../../../routes/appRoutes';

type FooterProps = {
  code: string;
  isGenerated?: boolean;
};

export const Footer = ({ code, isGenerated }: FooterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const onClickUseBonus = useCallback(() => {
    if (isOpen) return;
    trackWebviewEvent('CDC_BONUS_SHOW_CODE');
    setIsOpen(true);
  }, [isOpen]);

  const onClickClose = useCallback(() => {
    if (isGenerated) return navigate(APP_ROUTES.HOME);
    return navigate(-1);
  }, [isGenerated, navigate]);

  return (
    <>
      <Button variant="contained" onClick={onClickUseBonus}>
        Usa il buono
      </Button>

      <Button variant="text" onClick={onClickClose}>
        Chiudi
      </Button>

      <UseCodeSheet code={code} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
