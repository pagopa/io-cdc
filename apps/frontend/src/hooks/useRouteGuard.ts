import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USERS_ROUTE } from '../features/types/model';
import { APP_ROUTES } from '../routes/appRoutes';
import { selectSessionRoute } from '../features/reducers/auth/selectors';

/**
 * This hook is for test only purpose
 */
export const useRouteGuard = () => {
  const session = useSelector(selectSessionRoute);
  const navigate = useNavigate();

  useEffect(() => {
    if (session && session === USERS_ROUTE.REGISTRATION) {
      navigate(APP_ROUTES.SELECT_YEAR);
      return;
    }
  }, [navigate, session]);
};
