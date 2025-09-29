import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectFirstSessionData } from '../features/app/selectors';
import { useCallback, useEffect, useMemo } from 'react';
import { useLazyGetSessionQuery } from '../features/app/services';
import { APP_ROUTES } from '../utils/appRoutes';
import { isFetchBaseQueryError } from '../utils/isFetchBaseQueryError';

const redirectTokenError = { data: 'Session ID not provided', status: 401 };

export const useGetSession = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const session = useSelector(selectFirstSessionData);

  const redirectToken = useMemo(() => new URLSearchParams(search).get('id'), [search]);

  const [getSession] = useLazyGetSessionQuery();

  const retrieveSession = useCallback(async () => {
    if (!redirectToken) {
      navigate(APP_ROUTES.UNAUTHORIZED, {
        state: {
          status: redirectTokenError.status,
        },
      });
      return;
    }

    if (session && session.token) {
      navigate(APP_ROUTES.SELECT_YEAR);
      return;
    }

    const { isError: sessionError, error: sessionErrorMsg } = await getSession({
      id: redirectToken!,
    });

    if (sessionError && isFetchBaseQueryError(sessionErrorMsg)) {
      navigate(APP_ROUTES.UNAUTHORIZED, {
        state: {
          status: sessionErrorMsg.status,
        },
      });
      return;
    }
    navigate(APP_ROUTES.SELECT_YEAR);
    return;
  }, [getSession, navigate, redirectToken, session]);

  useEffect(() => {
    retrieveSession();
  }, [retrieveSession]);
};
