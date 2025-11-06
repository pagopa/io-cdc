import { Stack, Typography } from '@mui/material';
import { BottomSheet } from '../BottomSheet';

type OthersBonusSheetProps = {
  openSheet: [isOpen: boolean, spent: boolean];
  onClose: () => void;
};

export const OthersBonusSheet = ({ openSheet, onClose }: OthersBonusSheetProps) => {
  const [isOpen, spent] = openSheet;

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <Stack paddingX={3} gap={3}>
        <Typography fontSize={28} fontWeight={700}>
          {spent ? 'Buono speso da altri' : 'Buono generato da altri'}
        </Typography>
        <Stack gap={4}>
          <Typography variant="body1">
            Per questioni di riservatezza, non puoi accedere al dettaglio dei buoni creati dagli
            altri membri del nucleo familiare.
          </Typography>
          <Typography variant="body1">
            Se un buono viene annullato, i soldi tornano nel credito disponibile.
          </Typography>
        </Stack>
      </Stack>
    </BottomSheet>
  );
};
