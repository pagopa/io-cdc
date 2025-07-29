import { Stack } from '@mui/system';
import { useMemo, useState } from 'react';
import { Header } from '../../components/Header';
import { useCreateBonusMutation, useGetCardsQuery } from '../../store/services/api';
import { BonusCreationLoader } from './components/BonusCreationLoader';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { PopConfirm } from '../../components/PopConfirm';
import { APP_ROUTES } from '../../utils/appRoutes';
import { GenerateBonusSelectCard } from './components/SelectCard';
import { GenerateBonusSelectAmount } from './components/SelectAmount';
import { Card } from '../../store/services/model';

type CardOption = Pick<Card, 'balance' | 'year'>;

const GenerateTicket = () => {
  const { data: cards } = useGetCardsQuery();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectedCard = useMemo(() => pathname.split('/genera-buono/')[1], [pathname]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [
    createBonus,
    { isLoading: isCreatingBonus, isSuccess: isBonusCreationCompleted, data: newBonus },
  ] = useCreateBonusMutation();

  const openDialog = () => setIsDialogOpen(true);

  console.log(isBonusCreationCompleted, newBonus);

  const cardOptions = useMemo(() => {
    if (!cards) return [];
    return cards.reduce<CardOption[]>(
      (acc, { balance, year }) => (balance < 0 ? acc : [...acc, { balance, year }]),
      [],
    );
  }, [cards]);

  if (isBonusCreationCompleted && newBonus) {
    return <Navigate to={`/dettaglio-buono/${newBonus}`} />;
  }

  return isCreatingBonus ? (
    <BonusCreationLoader />
  ) : (
    <Stack p={4} height="100dvh">
      <Header onBack={selectedCard ? () => navigate(-1) : openDialog} />
      {selectedCard ? (
        <GenerateBonusSelectAmount
          card={cardOptions.find(({ year }) => year === selectedCard)!}
          createBonus={createBonus}
          onCancel={openDialog}
        />
      ) : (
        <GenerateBonusSelectCard cards={cardOptions} onCancel={openDialog} />
      )}
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
