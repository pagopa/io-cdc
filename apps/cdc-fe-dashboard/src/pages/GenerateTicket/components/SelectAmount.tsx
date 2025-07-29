import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '../../../store/services/model';
import { useCallback, useEffect } from 'react';
import { CreateBonusRequestDTO } from '../../../store/services/dto';
import { CdcInput } from '../../../components/Input';
import { GenerateTicketFormLayout } from './GenerateTicketFormLayout';

const bonusGeneratorSchema = z
  .object({
    card: z.object({
      year: z.string(),
      balance: z.number(),
    }),
    amount: z
      .string()
      .min(1, 'Importo obbligatorio')
      .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
        message: 'Deve essere un numero positivo',
      }),
  })
  .superRefine((data, ctx) => {
    const amount = parseFloat(data.amount);
    const balance = data.card.balance;

    if (amount > balance) {
      ctx.addIssue({
        path: ['amount'],
        message: "L'importo è superiore al credito disponibile",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type BonusGeneratorForm = z.infer<typeof bonusGeneratorSchema>;

type GenerateBonusSelectAmountProps = {
  card: Pick<Card, 'balance' | 'year'>;
  createBonus: (newBonus: CreateBonusRequestDTO) => void;
  onCancel: () => void;
};
export const GenerateBonusSelectAmount = ({
  card,
  createBonus,
  onCancel,
}: GenerateBonusSelectAmountProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<BonusGeneratorForm>({
    resolver: zodResolver(bonusGeneratorSchema),
  });

  useEffect(() => {
    setValue('card', card);
  }, [card, setValue]);

  const onSubmit = useCallback(
    async (data: BonusGeneratorForm) => {
      await createBonus({ amount: Number(data.amount), year: data.card.year });
    },
    [createBonus],
  );

  return (
    <GenerateTicketFormLayout
      onCancel={onCancel}
      onSubmit={handleSubmit(onSubmit)}
      subTitle="Scegli l'importo del buono"
    >
      <CdcInput
        fieldConfig={register('amount')}
        fullWidth
        label="Importo"
        disabled={!watch('card')}
        margin="normal"
        error={!!errors.amount}
        helperText={errors.amount?.message}
      />
    </GenerateTicketFormLayout>
  );
};
