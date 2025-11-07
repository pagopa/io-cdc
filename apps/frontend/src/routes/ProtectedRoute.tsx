import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectIsTokenValid, selectToken } from '../features/auth/selectors';
import { APP_ROUTES } from './appRoutes';
import { authActions } from '../features/auth/reducer';
import { useEffect } from 'react';

export const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  const isTokenValid = useSelector(selectIsTokenValid);

  useEffect(() => {
    if (!token || !isTokenValid) {
      dispatch(authActions.clearToken());
      navigate(APP_ROUTES.UNAUTHORIZED);
      return;
    }
  }, [dispatch, isTokenValid, navigate, token]);

  return <Outlet />;
};
