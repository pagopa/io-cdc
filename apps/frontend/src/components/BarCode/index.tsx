import Barcode from 'react-barcode';

type BarCodeProps = {
  code: string;
};
export const BarCode = ({ code }: BarCodeProps) => <Barcode value={code} format="CODE128" />;
