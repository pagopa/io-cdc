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
  console.log('🚀 ~ useGetSession ~ session:', { session });

  const redirectToken = useMemo(() => new URLSearchParams(search).get('id'), [search]);
  console.log('🚀 ~ useGetSession ~ session:', { redirectToken });

  const [getSession] = useLazyGetSessionQuery();

  const retrieveSession = useCallback(async () => {
    if (!redirectToken) {
      console.log('🚀 ~ useGetSession -> retrieveSession ~ redirect token not found:');

      navigate(APP_ROUTES.UNAUTHORIZED, {
        state: {
          status: redirectTokenError.status,
        },
      });
      return;
    }

    if (session && session.token) {
      console.log('🚀 ~ useGetSession -> retrieveSession ~ session already exist:');

      navigate(APP_ROUTES.SELECT_YEAR);
      return;
    }

    const { isError: sessionError, error: sessionErrorMsg } = await getSession({
      id: redirectToken!,
    });

    if (sessionError && isFetchBaseQueryError(sessionErrorMsg)) {
      console.log('🚀 ~ useGetSession -> retrieveSession ~ error fetching session:');
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
