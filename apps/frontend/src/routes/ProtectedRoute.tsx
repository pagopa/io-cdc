import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from './appRoutes';
import { useEffect } from 'react';
import { selectIsTokenValid, selectToken } from '../features/reducers/auth/selectors';
import { authActions } from '../features/reducers/auth/reducer';

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
