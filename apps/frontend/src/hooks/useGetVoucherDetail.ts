import { useNavigate } from 'react-router-dom';
import { useLazyGetVoucherByIdQuery } from '../features/app/services';
import { isFetchBaseQueryError } from '../utils/isFetchBaseQueryError';
import { APP_ROUTES } from '../routes/appRoutes';
import { useCallback, useEffect, useState } from 'react';
import { VoucherItem } from '../features/app/model';

type UseGetVoucherDetail = {
  id: string;
};

export const useGetVoucherDetail = ({ id }: UseGetVoucherDetail) => {
  const navigate = useNavigate();

  const [getVoucher] = useLazyGetVoucherByIdQuery();

  const [response, setResponse] = useState<
    Pick<
      Awaited<ReturnType<typeof getVoucher>>,
      'isError' | 'isSuccess' | 'error' | 'isLoading'
    > & {
      voucherDetail?: VoucherItem;
    }
  >({
    isLoading: true,
    isError: false,
    isSuccess: false,
    error: undefined,
  });

  const retrieveVoucher = useCallback(async () => {
    const { isError, error, isSuccess, data } = await getVoucher(id);

    if (isError && isFetchBaseQueryError(error)) {
      if (error.status === 401) return navigate(APP_ROUTES.UNAUTHORIZED);
      if (error.status === 403) return navigate(APP_ROUTES.EXPIRED_USAGE);

      navigate(APP_ROUTES.FEEDBACK_VOUCHERS, {
        state: { status: 503, name: 'CDC_BONUS_SHOW_DETAIL_ERROR' },
        replace: true,
      });
      return;
    }

    setResponse((prev) => ({ ...prev, isSuccess, isLoading: false, voucherDetail: data! }));
  }, [getVoucher, id, navigate]);

  useEffect(() => {
    retrieveVoucher();
  }, [retrieveVoucher]);

  return response;
};
