import { useCallback, useEffect, useState } from 'react';
import { useLazyGetAllVoucherQuery } from '../features/app/services';
import { VoucherItem } from '../features/app/model';

export const useGetAllVouchers = () => {
  const [_getVouchers] = useLazyGetAllVoucherQuery();

  const [response, setResponse] = useState<
    Pick<Awaited<ReturnType<typeof _getVouchers>>, 'isError' | 'isSuccess' | 'error'> & {
      vouchers: VoucherItem[];
    }
  >({
    isError: false,
    isSuccess: false,
    error: undefined,
    vouchers: [],
  });

  const getVouchers = useCallback(async () => {
    const { data: vouchers, isError, isSuccess, error } = await _getVouchers();

    setResponse({
      isError,
      isSuccess,
      error,
      vouchers: vouchers ?? [],
    });
  }, [_getVouchers]);

  useEffect(() => {
    getVouchers();
  }, [getVouchers]);

  return { ...response, getVouchers };
};
