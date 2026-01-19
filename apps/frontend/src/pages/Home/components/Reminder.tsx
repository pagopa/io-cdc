import { Icon } from '@io-cdc/ui';
import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ReactNode, useCallback, useState } from 'react';

type ReminderProps = {
  text: ReactNode;
  storageKey?: string;
};

export const Reminder = ({ text, storageKey }: ReminderProps) => {
  const isDismissable = !!storageKey;
  const [dismissed, setDismissed] = useState(
    storageKey ? Boolean(localStorage.getItem(storageKey)) : false,
  );

  const handleUnderstoodButton = useCallback(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, 'true');
    setDismissed(true);
  }, [storageKey]);

  if (dismissed) return null;
  return (
    <Box
      minWidth="70%"
      display="flex"
      alignItems="center"
      bgcolor="white"
      borderRadius={2}
      overflow="hidden"
    >
      <Box width={12} height="100%" bgcolor="#6BCFFB" />
      <Box display="flex" bgcolor="#F0FAFF" gap="1.2rem" px={1.5} py={2} alignItems="center">
        <Icon name="info" sx={{ color: '#17324D', height: 22, width: 22 }} />
        <Stack direction="column" gap={2}>
          <Typography fontSize="16px">{text}</Typography>
          {isDismissable && (
            <Button
              variant="text"
              onClick={handleUnderstoodButton}
              sx={{
                color: '#0070f3',
                fontWeight: 'bold',
                fontSize: 16,
                padding: 0,
                textTransform: 'none',
                height: 'auto',
                alignSelf: 'flex-start',
              }}
            >
              Ho capito
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
