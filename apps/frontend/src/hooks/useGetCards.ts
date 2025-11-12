import { useCallback, useEffect, useState } from 'react';
import { useLazyGetCardsQuery } from '../features/app/services';
import { Card } from '../features/app/model';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../routes/appRoutes';
import { useDispatch } from 'react-redux';
import { ticketsActions } from '../features/app/reducers';

export const useGetCards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [getCards] = useLazyGetCardsQuery();

  const [response, setResponse] = useState<
    Pick<Awaited<ReturnType<typeof getCards>>, 'isError' | 'isSuccess' | 'error'> & {
      cards: Card[];
    }
  >({
    isError: false,
    isSuccess: false,
    error: undefined,
    cards: [],
  });

  const loadData = useCallback(async () => {
    const { data: cards, isError, isSuccess, error } = await getCards();

    if (!cards || !cards?.length) {
      navigate(APP_ROUTES.CARDS_EMPTY);
      return;
    }

    setResponse({
      isError,
      isSuccess,
      error,
      cards: cards ?? [],
    });

    dispatch(ticketsActions.setActiveCard(cards[0].year));
  }, [dispatch, getCards, navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return response;
};
