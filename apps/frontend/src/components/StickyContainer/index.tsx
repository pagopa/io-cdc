import { theme } from '@io-cdc/ui';
import { Stack } from '@mui/system';
import { PropsWithChildren } from 'react';

export const StickyContainer = ({ children }: PropsWithChildren) => {
  return (
    <Stack
      width="100dvw"
      position="sticky"
      alignSelf="center"
      gap={2}
      py={3}
      paddingInline={2}
      bottom={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: `
        0px -4px 12px rgba(0, 43, 85, 0.1)
      `,
      }}
    >
      {children}
    </Stack>
  );
};
