import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { trackWebviewEvent } from '../../../utils/trackEvent';
import { UseCodeSheet } from './UseCodeSheet';

type FooterProps = {
  code: string;
};

export const Footer = ({ code }: FooterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const onClickUseBonus = useCallback(() => {
    if (isOpen) return;
    trackWebviewEvent('CDC_BONUS_SHOW_CODE');
    setIsOpen(true);
  }, [isOpen]);

  return (
    <>
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
