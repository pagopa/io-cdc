import { Stack } from '@mui/material';
import { useEffect } from 'react';
import Barcode from 'react-barcode';
import { trackWebviewEvent } from '../../utils/trackEvent';

type BarCodeProps = {
  code: string;
};
export const BarCode = ({ code }: BarCodeProps) => {
  useEffect(() => {
    trackWebviewEvent('CDC_BONUS_CODE', { code_type: 'barcode' });
  }, []);
  return (
    <Stack border="1px solid #E8EBF1" borderRadius={2} width="100%" alignItems="center" padding={3}>
      <Barcode value={code} format="CODE128" />
    </Stack>
  );
};
