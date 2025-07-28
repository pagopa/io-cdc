import { CircularProgress, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { APP_ROUTES } from '../../utils/appRoutes';
import { useLoadYears } from '../../hooks/useLoadYears';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';

const Home = () => {
  const { isError, isSuccess, error } = useLoadYears();
  const navigate = useNavigate();
  const hasCompleted = isSuccess || isError;

  useEffect(() => {
    if (hasCompleted) {
      if (isSuccess) {
        navigate(APP_ROUTES.SELECT_YEAR);
      }
      if (isError && isFetchBaseQueryError(error)) {
        const ROUTE = error.status === 401 ? APP_ROUTES.UNAUTHORIZED : APP_ROUTES.EXPIRED;
        navigate(ROUTE, {
          state: {
            status: error.status,
          },
        });
      }
    }
  }, [error, hasCompleted, isError, isSuccess, navigate]);

  return (
    <Stack flex={1} justifyContent="center" alignItems="center" rowGap={2}>
      <CircularProgress size={40} style={{ color: '#1a73e8' }} />
      <Typography fontSize={22} fontWeight={700} textAlign="center">
        Ti stiamo indirizzando al servizio
      </Typography>
      <Typography textAlign="center">Attendi qualche secondo</Typography>
    </Stack>
  );
};

export default Home;
