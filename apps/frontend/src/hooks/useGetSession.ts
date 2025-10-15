import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectFirstSessionData } from '../features/app/selectors';
import { useCallback, useEffect, useMemo } from 'react';
import { useLazyGetSessionQuery } from '../features/app/services';
import { APP_ROUTES } from '../utils/appRoutes';
import { isFetchBaseQueryError } from '../utils/isFetchBaseQueryError';
import { getPathFromEvironment } from '../utils/getDefaultPathFromEnv';
import { authActions } from '../features/auth/reducer';
import { selectIsTokenValid } from '../features/auth/selectors';

const redirectTokenError = { data: 'Session ID not provided', status: 401 };

export const useGetSession = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();

  const session = useSelector(selectFirstSessionData);

  const isChachedSessionValid = useSelector(selectIsTokenValid);

  const redirectToken = useMemo(() => new URLSearchParams(search).get('id'), [search]);

  const [getSession] = useLazyGetSessionQuery();

  const retrieveSession = useCallback(async () => {
    if (!redirectToken && !isChachedSessionValid) {
      navigate(APP_ROUTES.UNAUTHORIZED, {
        state: {
          status: redirectTokenError.status,
        },
      });
      return;
    }

    if ((session && session.token) || isChachedSessionValid) {
      navigate(getPathFromEvironment());
      return;
    }

    const {
      isError: sessionError,
      error: sessionErrorMsg,
      data,
    } = await getSession({
      id: redirectToken!,
    });

    if (sessionError && isFetchBaseQueryError(sessionErrorMsg)) {
      dispatch(authActions.clearToken());
      navigate(APP_ROUTES.UNAUTHORIZED, {
        state: {
          status: sessionErrorMsg.status,
        },
      });
      return;
    }
    if (data?.token) {
      dispatch(authActions.setToken(data?.token));
    }
    navigate(getPathFromEvironment());
    return;
  }, [dispatch, getSession, isChachedSessionValid, navigate, redirectToken, session]);

  useEffect(() => {
    retrieveSession();
  }, [retrieveSession]);
};
