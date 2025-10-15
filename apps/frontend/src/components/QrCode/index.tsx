import { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { trackWebviewEvent } from '../../utils/trackEvent';

type QrCodeProps = {
  code: string;
};
export const QrCode = ({ code }: QrCodeProps) => {
  useEffect(() => {
    trackWebviewEvent('CDC_BONUS_CODE', { code_type: 'qrcode' });
  }, []);
  return <QRCode value={code} size={256} fgColor="#000" bgColor="#fff" level="M" />;
};
