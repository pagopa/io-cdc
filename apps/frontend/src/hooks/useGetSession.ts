import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
import { useLazyGetSessionQuery } from '../features/rtk/services';
import { APP_ROUTES } from '../routes/appRoutes';
import { isFetchBaseQueryError } from '../utils/isFetchBaseQueryError';
import { USERS_ROUTE } from '../features/types/model';
import { selectCachedSession, selectIsTokenValid } from '../features/reducers/auth/selectors';
import { authActions } from '../features/reducers/auth/reducer';

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
          cachedSession.route === USERS_ROUTE.USAGE ? APP_ROUTES.HOME : APP_ROUTES.SELECT_YEAR,
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
          cachedSession.route === USERS_ROUTE.USAGE ? APP_ROUTES.HOME : APP_ROUTES.SELECT_YEAR,
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
      const isUsage = data?.route === USERS_ROUTE.USAGE;
      navigate(isUsage ? APP_ROUTES.HOME : APP_ROUTES.SELECT_YEAR);
      return;
    }
    return;
  }, [dispatch, getSession, isChachedSessionValid, navigate, redirectToken, deviceId]);

  useEffect(() => {
    retrieveSession();
  }, [retrieveSession]);
};
