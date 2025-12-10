import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
import { useLazyGetSessionQuery } from '../features/app/services';
import { APP_ROUTES } from '../routes/appRoutes';
import { isFetchBaseQueryError } from '../utils/isFetchBaseQueryError';
import { getPathFromEvironment } from '../utils/getDefaultPathFromEnv';
import { authActions } from '../features/auth/reducer';
import { TEST_USERS } from '../features/app/model';
import { selectCachedSession, selectIsTokenValid } from '../features/auth/selectors';

const redirectTokenError = { data: 'Session ID not provided', status: 401 };

export const useGetSession = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();

  const redirectToken = useMemo(() => new URLSearchParams(search).get('id'), [search]);
  const deviceId = useMemo(() => new URLSearchParams(search).get('device'), [search]);

  const [getSession] = useLazyGetSessionQuery();

  const cachedSession = useSelector(selectCachedSession);
  const isChachedSessionValid = useSelector(selectIsTokenValid);

  const retrieveSession = useCallback(async () => {
    if (!redirectToken) {
      return navigate(APP_ROUTES.UNAUTHORIZED, {
        state: {
          status: redirectTokenError.status,
        },
      });
    }

    if (
      cachedSession &&
      cachedSession.redirectToken &&
      redirectToken === cachedSession.redirectToken
    ) {
      if (isChachedSessionValid)
        return navigate(
          cachedSession.route === TEST_USERS.USAGE ? APP_ROUTES.HOME : APP_ROUTES.SELECT_YEAR,
        );
      return navigate(APP_ROUTES.UNAUTHORIZED, {
        state: {
          status: redirectTokenError.status,
        },
      });
    }

    const {
      isError: sessionError,
      error: sessionErrorMsg,
      data,
    } = await getSession({
      id: redirectToken!,
    });

    if (sessionError && isFetchBaseQueryError(sessionErrorMsg)) {
      if (isChachedSessionValid && cachedSession) {
        return navigate(
          cachedSession.route === TEST_USERS.USAGE ? APP_ROUTES.HOME : APP_ROUTES.SELECT_YEAR,
        );
      }
      dispatch(authActions.clearToken());
      navigate(APP_ROUTES.UNAUTHORIZED, {
        state: {
          status: sessionErrorMsg.status,
        },
      });
      return;
    }
    if (data?.token) {
      dispatch(authActions.setToken({ ...data, redirectToken, deviceId: deviceId ?? undefined }));
      //THIS LOGIC IS IN USE FOR TESTING ONLY - ROUTE MUST BE PASSED ONLY FOR TESTER USERS
      if (data?.route === TEST_USERS.USAGE) {
        navigate(APP_ROUTES.HOME);
        return;
      }
    }
    navigate(getPathFromEvironment());
    return;
  }, [dispatch, getSession, isChachedSessionValid, navigate, redirectToken, deviceId]);

  useEffect(() => {
    retrieveSession();
  }, [retrieveSession]);
};
