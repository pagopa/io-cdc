import { PropsWithChildren } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

const TEXT_COLOR = '#5C6F82';

type GenerateTicketFormLayoutProps = PropsWithChildren<{
  onSubmit: () => any;
  onCancel: () => void;
  subTitle: string;
}>;

export const GenerateTicketFormLayout = ({
  onSubmit,
  onCancel,
  subTitle,
  children,
}: GenerateTicketFormLayoutProps) => {
  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      onSubmit={onSubmit}
      noValidate
      flex={1}
    >
      <Stack gap={6}>
        <Stack gap={2}>
          <Typography variant="h2">Genera un buono</Typography>
          <Typography color={TEXT_COLOR} fontSize={16}>
            {subTitle}
          </Typography>
        </Stack>
        <Stack>{children}</Stack>
      </Stack>
      <Stack width="100%" justifySelf="end">
        <Button variant="contained" type="submit">
          Continua
        </Button>
        <Button variant="text" onClick={onCancel}>
          Annulla
        </Button>
      </Stack>
    </Box>
  );
};
