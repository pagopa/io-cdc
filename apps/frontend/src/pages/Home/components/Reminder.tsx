import { Icon } from '@io-cdc/ui';
import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useCallback, useState } from 'react';

export const Reminder = () => {
  const [reminder, setReminder] = useState(Boolean(localStorage.getItem('reminder')));

  const handleUnderstoodButton = useCallback(() => {
    localStorage.setItem('reminder', 'true');
    setReminder(true);
  }, []);

  if (reminder) return null;
  return (
    <Box
      minWidth="70%"
      display="flex"
      alignItems="center"
      bgcolor="white"
      borderRadius={2}
      overflow="hidden"
      boxShadow="4px 4px 12px rgba(0, 43, 85, 0.1)"
    >
      <Box width={12} height="100%" bgcolor="#6BCFFB" />
      <Box display="flex" bgcolor="#F0FAFF" gap="1.2rem" px={1.5} py={2} alignItems="center">
        <Icon name="info" sx={{ color: '#17324D', height: 22, width: 22 }} />
        <Stack direction="column" gap={2}>
          <Typography>
            <strong>Ricorda:</strong> il credito disponibile si riduce anche quando{' '}
            <strong> altre persone del tuo nucleo familiare</strong> generano i buoni.
          </Typography>
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
        </Stack>
      </Box>
    </Box>
  );
};
