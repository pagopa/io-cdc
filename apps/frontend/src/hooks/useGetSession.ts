import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectFirstSessionData } from '../features/app/selectors';
import { useCallback, useEffect, useMemo } from 'react';
import { useLazyGetSessionQuery } from '../features/app/services';
import { APP_ROUTES } from '../routes/appRoutes';
import { isFetchBaseQueryError } from '../utils/isFetchBaseQueryError';
import { getPathFromEvironment } from '../utils/getDefaultPathFromEnv';
import { authActions } from '../features/auth/reducer';
import { selectCachedSession, selectIsTokenValid } from '../features/auth/selectors';
import { TEST_USERS } from '../features/app/model';

const redirectTokenError = { data: 'Session ID not provided', status: 401 };

export const useGetSession = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();

  const session = useSelector(selectCachedSession);

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
      if (session?.route === TEST_USERS.USAGE) {
        navigate(APP_ROUTES.HOME);
        return;
      }
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
      dispatch(authActions.setToken(data));
      //THIS LOGIC IS IN USE FOR TESTING ONLY - ROUTE MUST BE PASSED ONLY FOR TESTER USERS
      if (data?.route === TEST_USERS.USAGE) {
        navigate(APP_ROUTES.HOME);
        return;
      }
    }
    navigate(getPathFromEvironment());
    return;
  }, [dispatch, getSession, isChachedSessionValid, navigate, redirectToken, session]);

  useEffect(() => {
    retrieveSession();
  }, [retrieveSession]);
};
