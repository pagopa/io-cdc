import QRCode from 'react-qr-code';

type QrCodeProps = {
  code: string;
};
export const QrCode = ({ code }: QrCodeProps) => (
  <QRCode value={code} size={256} fgColor="#000" bgColor="#fff" level="M" />
);
