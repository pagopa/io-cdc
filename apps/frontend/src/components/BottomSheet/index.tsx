import { Icon } from '@io-cdc/ui';
import { Drawer } from '@mui/material';
import { Stack } from '@mui/system';
import { PropsWithChildren } from 'react';

/**
 * @param snapPoint - percentage of viewport occupied by sheet - (default 0.5)
 */
type BottomSheetProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  snapPoint?: number;
}>;

export const BottomSheet = ({ isOpen, onClose, children, snapPoint = 0.5 }: BottomSheetProps) => {
  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          position: 'absolute',
          inset: 0,
          marginTop: 'auto',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: `${snapPoint * 100}vh`,
          overflow: 'hidden',
          p: 0,
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Stack flexDirection="column" flex={1}>
        <Stack alignItems="end" paddingX={3} paddingY={2}>
          <Icon onClick={onClose} name="close" height={14} width={14} />
        </Stack>{' '}
        <Stack flexGrow={1} overflow="auto">
          {children}
        </Stack>
      </Stack>
    </Drawer>
  );
};
