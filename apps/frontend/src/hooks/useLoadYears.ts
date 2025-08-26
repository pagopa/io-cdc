import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useLazyGetNotAvailableYearsListQuery,
  useLazyGetSessionQuery,
  useLazyGetYearsListQuery,
} from '../features/app/services';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFirstSessionData } from '../features/app/selectors';
import { Year } from '../features/app/model';

const redirectTokenError = { data: 'Session ID not provided', status: 401 };

export const useLoadYears = () => {
  const { search } = useLocation();

  const session = useSelector(selectFirstSessionData);

  const redirectToken = useMemo(() => new URLSearchParams(search).get('id'), [search]);

  const [getSession] = useLazyGetSessionQuery();
  const [getYearsList] = useLazyGetYearsListQuery();
  const [getNotAvailableYearsList] = useLazyGetNotAvailableYearsListQuery();

  const [response, setResponse] = useState<
    Pick<Awaited<ReturnType<typeof getYearsList>>, 'isError' | 'isSuccess' | 'error'> & {
      yearsList: Year[];
    }
  >({
    isError: false,
    isSuccess: false,
    error: undefined,
    yearsList: [],
  });

  const loadData = useCallback(async () => {
    if (!redirectToken) {
      setResponse((response) => ({
        ...response,
        isError: true,
        error: redirectTokenError,
      }));
      return;
    }
    if (!session || !session?.token) {
      const {
        data,
        isError: sessionError,
        error: sessionErrorMsg,
      } = await getSession({ id: redirectToken! });

      if (!data) {
        setResponse((response) => ({ ...response, isError: sessionError, error: sessionErrorMsg }));
        return;
      }
    }

    const {
      data: availableYears,
      isError: getYearsListIsError,
      isSuccess: getYearsListIsSuccess,
      error: getYearsListError,
    } = await getYearsList();

    const {
      data: notAvailableYears,
      isError: getNotAvailableYearsListIsError,
      isSuccess: getNotAvailableYearsListIsSuccess,
      error: getNotAvailableYearsListError,
    } = await getNotAvailableYearsList();

    const allRequestsDone = availableYears?.every((y) =>
      Boolean(notAvailableYears?.find(({ year }) => year === y)),
    );

    const isError = allRequestsDone || getYearsListIsError || getNotAvailableYearsListIsError;
    const isSuccess = getYearsListIsSuccess && getNotAvailableYearsListIsSuccess;
    const error = allRequestsDone
      ? { status: 501, data: null }
      : getYearsListError || getNotAvailableYearsListError;

    const yearsList = (availableYears || []).map((year) => ({
      label: year,
      value: year,
      disabled: (notAvailableYears || []).map(({ year }) => year).includes(year),
    }));

    setResponse({
      isError,
      isSuccess,
      error,
      yearsList,
    });
  }, [getNotAvailableYearsList, getSession, getYearsList, redirectToken, session]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return response;
};
