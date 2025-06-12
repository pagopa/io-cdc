import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useLazyGetNotAvailableYearsListQuery,
  useLazyGetSessionQuery,
  useLazyGetYearsListQuery,
} from '../features/app/services';
import { useLocation } from 'react-router-dom';

export const useLoadYears = () => {
  const { search } = useLocation();

  const sessionToken = useMemo(() => localStorage.getItem('token'), []);

  const token = useMemo(() => search.split('id=')[1], [search]);

  const [getSession] = useLazyGetSessionQuery();
  const [getYearsList] = useLazyGetYearsListQuery();
  const [getNotAvailableYearsList] = useLazyGetNotAvailableYearsListQuery();

  const [response, setResponse] = useState<
    Pick<Awaited<ReturnType<typeof getYearsList>>, 'isError' | 'isSuccess' | 'error'>
  >({
    isError: false,
    isSuccess: false,
    error: undefined,
  });

  const loadData = useCallback(async () => {
    if (!sessionToken) {
      const {
        data,
        isSuccess: sessionSuccess,
        isError: sessionError,
        error: sessionErrorMsg,
      } = await getSession({ id: token });

      if (!data) return { ...response, isError: true, error: sessionErrorMsg };

      localStorage.setItem('token', data.token);
    }

    const {
      isError: getYearsListIsError,
      isSuccess: getYearsListIsSuccess,
      error: getYearsListError,
    } = await getYearsList();
    const {
      isError: getNotAvailableYearsListIsError,
      isSuccess: getNotAvailableYearsListIsSuccess,
      error: getNotAvailableYearsListError,
    } = await getNotAvailableYearsList();

    const isError = getYearsListIsError || getNotAvailableYearsListIsError;
    const isSuccess = getYearsListIsSuccess && getNotAvailableYearsListIsSuccess;
    const error = getYearsListError || getNotAvailableYearsListError;
    setResponse({
      isError,
      isSuccess,
      error,
    });
  }, [getNotAvailableYearsList, getSession, getYearsList, response, sessionToken, token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return response;
};
