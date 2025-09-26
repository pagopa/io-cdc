import { useCallback, useEffect, useState } from 'react';
import {
  useLazyGetNotAvailableYearsListQuery,
  useLazyGetYearsListQuery,
} from '../features/app/services';
import { Year } from '../features/app/model';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../utils/appRoutes';
import { isFetchBaseQueryError } from '../utils/isFetchBaseQueryError';

export const useLoadYears = () => {
  console.log('start useloadyears');
  const navigate = useNavigate();
  const [getYearsList] = useLazyGetYearsListQuery();
  const [getNotAvailableYearsList] = useLazyGetNotAvailableYearsListQuery();

  const [response, setResponse] = useState<
    Pick<Awaited<ReturnType<typeof getYearsList>>, 'isError' | 'isSuccess' | 'error'> & {
      yearsList: Year[];
      notAvailableYears: string[];
    }
  >({
    isError: false,
    isSuccess: false,
    error: undefined,
    yearsList: [],
    notAvailableYears: [],
  });

  const loadData = useCallback(async () => {
    console.log('start useloadyears -> start loadData');

    const {
      data: availableYears,
      isError: getYearsListIsError,
      isSuccess: getYearsListIsSuccess,
      error: getYearsListError,
    } = await getYearsList();
    console.log('start useloadyears -> called getYearsList');

    const {
      data: notAvailableYears,
      isError: getNotAvailableYearsListIsError,
      isSuccess: getNotAvailableYearsListIsSuccess,
      error: getNotAvailableYearsListError,
    } = await getNotAvailableYearsList();

    console.log('start useloadyears -> called getNotAvailableYearsList');

    const allRequestsDone = availableYears?.every((y) =>
      Boolean(notAvailableYears?.find(({ year }) => year === y)),
    );

    if (allRequestsDone) {
      navigate(APP_ROUTES.EXPIRED, { state: { status: 502 } });
      return;
    }

    const isError = getYearsListIsError || getNotAvailableYearsListIsError;
    const isSuccess = getYearsListIsSuccess && getNotAvailableYearsListIsSuccess;
    const error = getYearsListError || getNotAvailableYearsListError;

    if (isError && isFetchBaseQueryError(error)) {
      navigate(APP_ROUTES.EXPIRED, { state: { status: error.status } });
      return;
    }

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
      notAvailableYears: (notAvailableYears ?? []).map(({ year }) => year),
    });
  }, [getNotAvailableYearsList, getYearsList, navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return response;
};
