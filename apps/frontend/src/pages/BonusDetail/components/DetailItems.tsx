import { Divider } from '@mui/material';
import { Stack } from '@mui/system';
import { PropsWithChildren, ReactNode } from 'react';

export const DetailItemWrapper = ({
  children,
  chip,
  last,
}: PropsWithChildren<{ chip?: ReactNode; last?: boolean }>) => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={last ? 3 : 0}>
        <Stack>{children}</Stack>
        {chip}
      </Stack>
      {!last && <Divider />}
    </>
  );
};
