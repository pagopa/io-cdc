import { Divider, Stack, Typography } from '@mui/material';
import { BarCode } from '../../../components/BarCode';
import { QrCode } from '../../../components/QrCode';

type CodesSectionProps = {
  code: string;
};

export const CodesSection = ({ code }: CodesSectionProps) => {
  return (
    <>
      <Stack gap={3}>
        <Typography color="#5C6F82">Bar code</Typography>
        <Stack gap={3} alignItems="center">
          <BarCode code={code} />
        </Stack>
      </Stack>
      <Divider />
      <Stack gap={3}>
        <Typography color="#5C6F82">QR Code</Typography>
        <Stack gap={3} alignItems="center">
          <QrCode code={code} />
        </Stack>
      </Stack>
    </>
  );
};
