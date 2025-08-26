import { Icon } from '@io-cdc/ui';
import { Button } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  onBack?: () => void;
};
export const Header = ({ onBack }: HeaderProps) => {
  const navigate = useNavigate();

  const handleBackClick = useCallback(() => {
    if (onBack) {
      return onBack();
    }
    navigate(-1);
  }, [onBack, navigate]);

  return (
    <Button
      onClick={handleBackClick}
      sx={{
        width: 'max-content',
        padding: 0,
      }}
    >
      <Icon name="back" />
    </Button>
  );
};
