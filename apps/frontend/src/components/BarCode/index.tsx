import { Button, Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
import Barcode from 'react-barcode';
import copy from 'copy-to-clipboard';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { useToast } from '../../contexts';

type BarCodeProps = {
  code: string;
  isOpen?: boolean;
};
export const BarCode = ({ code, isOpen }: BarCodeProps) => {
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      trackWebviewEvent('CDC_BONUS_CODE', { code_type: 'barcode' });
    }
  }, [isOpen]);

  const copyBonusCode = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_COPY_CODE', { code_type: 'barcode' });
    copy(code);
    showToast({
      message: 'Il codice è stato copiato',
      messageType: 'success',
      onOpen: () => trackWebviewEvent('CDC_BONUS_COPY_CODE_SUCCESS'),
    });
  }, [code, showToast]);

  return (
    <Stack direction="column" flexGrow={1} justifyContent="space-between" width="100%">
      <Stack
        border="1px solid #E8EBF1"
        borderRadius={2}
        width="100%"
        alignItems="center"
        padding={3}
      >
        <Barcode value={code} format="CODE128" />
      </Stack>
      <Button variant="contained" onClick={copyBonusCode}>
        Copia codice
      </Button>
    </Stack>
  );
};
