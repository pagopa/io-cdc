import { useCallback, useEffect, useState } from 'react';
import { useLazyGetCardsQuery, useLazyGetVoucherQuery } from '../features/app/services';
import { Card, VoucherItem } from '../features/app/model';
import { isFetchBaseQueryError } from '../utils/isFetchBaseQueryError';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../utils/appRoutes';

export const useGetCardsAndVouchers = () => {
  const navigate = useNavigate();

  const [getCards] = useLazyGetCardsQuery();
  const [getVouchers] = useLazyGetVoucherQuery();

  const [response, setResponse] = useState<
    Pick<Awaited<ReturnType<typeof getCards>>, 'isError' | 'isSuccess' | 'error'> & {
      cards: Card[];
      vouchers: VoucherItem[];
    }
  >({
    isError: false,
    isSuccess: false,
    error: undefined,
    cards: [],
    vouchers: [],
  });

  const loadData = useCallback(async () => {
    const {
      data: cards,
      isError: getCardsIsError,
      isSuccess: getCardsIsSuccess,
      error: getCardsError,
    } = await getCards();

    const {
      data: vouchers,
      isError: getVouchersListIsError,
      isSuccess: getVouchersListIsSuccess,
      error: getVouchersListError,
    } = await getVouchers();

    const isError = getCardsIsError || getVouchersListIsError;
    const isSuccess = getCardsIsSuccess && getVouchersListIsSuccess;
    const error = getCardsError || getVouchersListError;

    if (isError && isFetchBaseQueryError(error)) {
      /**/ /TODO remove this  */;
      navigate(APP_ROUTES.FEEDBACK_REQUEST, { state: { status: 500 } });
      return;
    }

    setResponse({
      isError,
      isSuccess,
      error,
      cards: cards ?? [],
      vouchers: vouchers ?? [],
    });
  }, [getCards, getVouchers, navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return response;
};
