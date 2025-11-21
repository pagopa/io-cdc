import { useCallback, useEffect, useState } from 'react';
import { useLazyGetVoucherQuery } from '../features/app/services';
import { VoucherItem } from '../features/app/model';
import { selectActiveCard } from '../features/app/selectors';
import { useSelector } from 'react-redux';

export const useGetVouchers = () => {
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

      setResponse({
        isError,
        isSuccess,
        error,
        vouchers: vouchers ?? [],
      });
    },
    [_getVouchers],
  );

  useEffect(() => {
    getVouchers(activeCard);
  }, [getVouchers, activeCard]);

  return { ...response, getVouchers };
};
