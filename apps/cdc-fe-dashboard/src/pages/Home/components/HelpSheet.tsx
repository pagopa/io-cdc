import { IconButton, Stack, Typography } from '@mui/material';
import { Icon } from '@io-cdc/ui';
import { Sheet } from 'react-modal-sheet';

type HelpSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const HelpSheet = ({ isOpen, onClose }: HelpSheetProps) => {
  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      disableDrag
      snapPoints={[1]}
      initialSnap={0}
      detent="full-height"
    >
      <Sheet.Container
        style={{
          height: '100dvh',
          borderRadius: 0,
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
              }}
            >
              <Icon name="close" />
            </IconButton>
          </Stack>
        </Sheet.Header>
        <Sheet.Content>
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
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};
