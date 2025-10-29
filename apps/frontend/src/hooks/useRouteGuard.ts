import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TEST_USERS } from '../features/app/model';
import { APP_ROUTES } from '../utils/appRoutes';
import { selectSessionRoute } from '../features/auth/selectors';

/**
 * This hook is for test only purpose
 */
export const useRouteGuard = () => {
  const session = useSelector(selectSessionRoute);
  const navigate = useNavigate();

  useEffect(() => {
    if (session && session === TEST_USERS.REGISTRATION) {
      navigate(APP_ROUTES.SELECT_YEAR);
      return;
    }
  }, [navigate, session]);
};
