import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

export const Layout = () => {
  return (
    <Stack height="100dvh" justifyContent="space-between">
      <Outlet />
    </Stack>
  );
};
