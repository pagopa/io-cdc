import { Stack, Typography } from '@mui/material';
import { BottomSheet } from '../../../components/BottomSheet';

type HelpSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};
// TODO for now its unused
export const HelpSheet = ({ isOpen, onClose }: HelpSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} snapPoint={1}>
      <Stack padding={3} gap={3}>
        <Typography fontSize={28} fontWeight={700}>
          Come funziona
        </Typography>
        <Typography fontSize={16} fontWeight={400}>
          Il saldo Disponibile include i buoni,
          <b>generati da te o altri membri del nucleo familiare</b>, ancora da spendere e spesi.
          <br />
          Se si genera un buono, il saldo disponibile si riduce.
        </Typography>
      </Stack>
    </BottomSheet>
  );
};
