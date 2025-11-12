import { useCallback, useEffect, useState } from 'react';
import { useLazyGetVoucherQuery } from '../features/app/services';
import { VoucherItem } from '../features/app/model';
import { useNavigate } from 'react-router-dom';
import { selectActiveCard } from '../features/app/selectors';
import { useSelector } from 'react-redux';

export const useGetVouchers = () => {
  const activeCard = useSelector(selectActiveCard);

  const navigate = useNavigate();

  const [getVouchers] = useLazyGetVoucherQuery();

  const initialState = {
    isError: false,
    isSuccess: false,
    error: undefined,
    vouchers: [],
  };

  const [response, setResponse] = useState<
    Pick<Awaited<ReturnType<typeof getVouchers>>, 'isError' | 'isSuccess' | 'error'> & {
      vouchers: VoucherItem[];
    }
  >(initialState);

  const getData = useCallback(
    async (activeCard: string) => {
      setResponse(initialState);
      if (!activeCard) return response;
      const { data: vouchers, isError, isSuccess, error } = await getVouchers(activeCard);

      setResponse({
        isError,
        isSuccess,
        error,
        vouchers: vouchers ?? [],
      });
    },
    [getVouchers, navigate],
  );

  useEffect(() => {
    getData(activeCard);
  }, [getData, activeCard]);

  return { ...response, getData };
};
