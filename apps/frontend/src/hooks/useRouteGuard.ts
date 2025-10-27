import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TEST_USERS } from '../features/app/model';
import { selectFirstSessionData } from '../features/app/selectors';
import { APP_ROUTES } from '../utils/appRoutes';

/**
 * This hook is for test only purpose
 */
export const useRouteGuard = () => {
  const session = useSelector(selectFirstSessionData);
  const navigate = useNavigate();

  useEffect(() => {
    if (session && session.route === TEST_USERS.REGISTRATION) {
      navigate(APP_ROUTES.SELECT_YEAR);
      return;
    }
  }, [navigate, session]);
};
