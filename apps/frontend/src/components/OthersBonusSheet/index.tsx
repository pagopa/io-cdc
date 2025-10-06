import { Stack, Typography } from '@mui/material';
import { Icon } from '@io-cdc/ui';
import { Sheet } from 'react-modal-sheet';

type OthersBonusSheetProps = {
  status: [boolean, boolean];
  onClose: () => void;
};

export const OthersBonusSheet = ({ status, onClose }: OthersBonusSheetProps) => {
  const [isOpen, spent] = status;
  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      disableDrag
      snapPoints={[0.4]}
      initialSnap={0}
      detent="full-height"
    >
      <Sheet.Container
        style={{
          height: 'calc(var(--vh, 1vh) * 100)',
          borderRadius: 16,
          transitionDuration: isOpen ? '0ms' : '500ms',
        }}
      >
        <Sheet.Header>
          <Stack alignItems="end" paddingX={3} paddingY={2}>
            <Icon onClick={onClose} name="close" color="disabled" height={14} width={14} />
          </Stack>
        </Sheet.Header>
        <Sheet.Content>
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
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};
