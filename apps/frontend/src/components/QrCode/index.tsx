import { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { trackWebviewEvent } from '../../utils/trackEvent';

type QrCodeProps = {
  code: string;
  isOpen?: boolean;
};
export const QrCode = ({ code, isOpen }: QrCodeProps) => {
  useEffect(() => {
    if (isOpen) {
      trackWebviewEvent('CDC_BONUS_CODE', { code_type: 'qrcode' });
    }
  }, [isOpen]);

  return <QRCode value={code} size={256} fgColor="#000" bgColor="#fff" level="M" />;
};
