import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '../../../store/services/model';
import { CdcSelect } from '../../../components/Select';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GenerateTicketFormLayout } from './GenerateTicketFormLayout';

const bonusGeneratorSchema = z.object({
  card: z.object({
    year: z.string(),
    balance: z.number(),
  }),
});

export type BonusGeneratorForm = z.infer<typeof bonusGeneratorSchema>;

type GenerateBonusSelectCardProps = {
  cards: Pick<Card, 'balance' | 'year'>[];
  onCancel: () => void;
};
export const GenerateBonusSelectCard = ({ cards, onCancel }: GenerateBonusSelectCardProps) => {
  const { handleSubmit, setValue, watch } = useForm<BonusGeneratorForm>({
    resolver: zodResolver(bonusGeneratorSchema),
  });

  const navigate = useNavigate();

  const onSubmit = useCallback(
    (data: BonusGeneratorForm) => {
      navigate(`/genera-buono/${data.card.year}`);
    },
    [navigate],
  );

  return (
    <GenerateTicketFormLayout
      onCancel={onCancel}
      onSubmit={handleSubmit(onSubmit)}
      subTitle="Scegli quale Carta della Cultura vuoi usare"
    >
      <CdcSelect cards={cards} onSelect={setValue} value={watch('card')?.year} />
    </GenerateTicketFormLayout>
  );
};
