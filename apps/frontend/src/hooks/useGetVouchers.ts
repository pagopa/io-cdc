import { useCallback, useEffect, useState } from 'react';
import { useLazyGetVoucherQuery } from '../features/rtk/services';
import { VoucherItem } from '../features/types/model';
import { selectActiveCard } from '../features/reducers/usage/selectors';
import { useSelector } from 'react-redux';
import { isFetchBaseQueryError } from '../utils/isFetchBaseQueryError';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../routes/appRoutes';
import { sortByCreationDate } from '../utils/sortVouchers';

export const useGetVouchers = () => {
  const navigate = useNavigate();
  const activeCard = useSelector(selectActiveCard);

  const [_getVouchers] = useLazyGetVoucherQuery();

  const initialState = {
    isError: false,
    isSuccess: false,
    error: undefined,
    vouchers: [],
  };

  const [response, setResponse] = useState<
    Pick<Awaited<ReturnType<typeof _getVouchers>>, 'isError' | 'isSuccess' | 'error'> & {
      vouchers: VoucherItem[];
    }
  >(initialState);

  const getVouchers = useCallback(
    async (activeCard: string) => {
      setResponse(initialState);
      if (!activeCard) return response;
      const { data: vouchers, isError, isSuccess, error } = await _getVouchers(activeCard);

      if (isError && isFetchBaseQueryError(error)) {
        if (error.status === 401) return navigate(APP_ROUTES.UNAUTHORIZED);
        if (error.status === 403) return navigate(APP_ROUTES.EXPIRED_USAGE);
      }

      const orderedVouchers = sortByCreationDate(vouchers);

      setResponse({
        isError,
        isSuccess,
        error,
        vouchers: orderedVouchers ?? [],
      });
    },
    [_getVouchers],
  );

  useEffect(() => {
    getVouchers(activeCard);
  }, [getVouchers, activeCard]);

  return { ...response, getVouchers };
};
