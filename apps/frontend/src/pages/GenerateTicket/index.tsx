import { Stack } from '@mui/system';
import { useMemo, useState } from 'react';
import { Header } from '../../components/Header';
import { NewBonusForm } from './components/NewBonusForm';
import { useCreateBonusMutation, useGetCardsQuery } from '../../store/services/api';
import { BonusCreationLoader } from './components/BonusCreationLoader';
import { Navigate, useNavigate } from 'react-router-dom';
import { PopConfirm } from '../../components/PopConfirm';
import { APP_ROUTES } from '../../utils/appRoutes';

const GenerateTicket = () => {
  const { data: cards } = useGetCardsQuery();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      <Header onBack={() => setIsDialogOpen(true)} />
      <NewBonusForm
        cards={cardOptions}
        createBonus={createBonus}
        onCancel={() => setIsDialogOpen(true)}
      />
      <PopConfirm
        isOpen={isDialogOpen}
        title="Vuoi interrompere l'operazione?"
        buttonConfirm={{
          title: 'SI, INTERROMPI',
          onClick: () => navigate(APP_ROUTES.HOME),
        }}
        buttonClose={{
          title: 'TORNA INDIETRO',
          onClick: () => setIsDialogOpen(false),
        }}
      />
    </Stack>
  );
};

export default GenerateTicket;
