import { IconButton, Stack, Typography } from '@mui/material';
import { Icon } from '@io-cdc/ui';
import { Sheet } from 'react-modal-sheet';

type OthersBonusSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const OthersBonusSheet = ({ isOpen, onClose }: OthersBonusSheetProps) => {
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
          height: '100dvh',
          borderRadius: 16,
          transitionDuration: isOpen ? '0ms' : '500ms',
        }}
      >
        <Sheet.Header>
          <Stack alignItems="end" paddingX={3}>
            <IconButton
              onClick={onClose}
              sx={{
                color: 'unset',
                fontSize: '14px',
                minHeight: '56px',
              }}
            >
              <Icon name="close" color="disabled" />
            </IconButton>
          </Stack>
        </Sheet.Header>
        <Sheet.Content>
          <Stack padding={3} gap={3}>
            <Typography fontSize={28} fontWeight={700}>
              Buono generato da altri
            </Typography>
            <Stack gap={4}>
              <Typography fontSize={16} fontWeight={400}>
                Per questioni di riservatezza, non puoi accedere al dettaglio dei buoni creati dagli
                altri membri del nucleo familiare.
              </Typography>
              <Typography fontSize={16} fontWeight={400}>
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
