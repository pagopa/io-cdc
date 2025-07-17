import { Stack } from '@mui/system';
import { useMemo } from 'react';
import { Header } from '../../components/Header';
import { NewBonusForm } from './components/NewBonusForm';
import { useCreateBonusMutation, useGetCardsQuery } from '../../store/services/api';
import { BonusCreationLoader } from './components/BonusCreationLoader';
import { Navigate } from 'react-router-dom';

const GenerateTicket = () => {
  const { data: cards } = useGetCardsQuery();

  const [
    createBonus,
    { isLoading: isCreatingBonus, isSuccess: isBonusCreationCompleted, data: newBonus },
  ] = useCreateBonusMutation();

  console.log(isBonusCreationCompleted, newBonus);

  const cardOptions = useMemo(() => {
    if (!cards) return [];
    return cards.map(({ balance, year }) => ({ balance, year }));
  }, [cards]);

  if (isBonusCreationCompleted && newBonus) {
    return <Navigate to={`/dettaglio-buono/${newBonus}`} />;
  }

  return isCreatingBonus ? (
    <BonusCreationLoader />
  ) : (
    <Stack p={4} height="100dvh">
      <Header />
      <NewBonusForm cards={cardOptions} createBonus={createBonus} />
    </Stack>
  );
};

export default GenerateTicket;
