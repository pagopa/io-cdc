import { Icon, theme } from '@io-cdc/ui';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

type MerchantDetailProps = {
  merchant: string | undefined;
  usage_date: string | undefined;
};
export const MerchantDetail = ({ merchant, usage_date }: MerchantDetailProps) => {
  if (!merchant) return null;
  return (
    <Stack direction="column" gap={2} mb={4}>
      <Stack direction="row" gap={2} py={1} alignItems="flex-end">
        <Icon name="store" />
        <Typography fontWeight={700} fontSize={18}>
          ESERCENTE
        </Typography>
      </Stack>

      <Stack gap={0.5}>
        <Typography fontWeight={700} fontSize={18}>
          {merchant}
        </Typography>
        <Typography color={theme.palette.text.secondary}>{usage_date}</Typography>
      </Stack>
    </Stack>
  );
};
