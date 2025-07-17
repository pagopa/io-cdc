import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, Typography } from '@mui/material';
import { CdcInput } from '../../../components/Input';
import { Card } from '../../../store/services/model';
import { CdcSelect } from '../../../components/Select';
import { UndoDialog } from './UndoDialog';
import { useCallback } from 'react';
import { CreateBonusRequestDTO } from '../../../store/services/dto';

const TEXT_COLOR = '#5C6F82';

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

type NewBonusFormProps = {
  cards: Pick<Card, 'balance' | 'year'>[];
  createBonus: (newBonus: CreateBonusRequestDTO) => void;
};
export const NewBonusForm = ({ cards, createBonus }: NewBonusFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<BonusGeneratorForm>({
    resolver: zodResolver(bonusGeneratorSchema),
  });

  const onSubmit = useCallback(
    async (data: BonusGeneratorForm) => {
      await createBonus({ amount: Number(data.amount), year: data.card.year });
    },
    [createBonus],
  );

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      flex={1}
    >
      <Stack gap={6}>
        <Stack gap={2}>
          <Typography variant="h2">Genera un buono</Typography>
          <Typography color={TEXT_COLOR} fontSize={16}>
            Scegli quale Carta della Cultura vuoi usare e l&apos;importo
          </Typography>
        </Stack>
        <Stack>
          <CdcSelect cards={cards} onSelect={setValue} value={watch('card')?.year} />
          <CdcInput
            fieldConfig={register('amount')}
            fullWidth
            label="Importo"
            disabled={!watch('card')}
            margin="normal"
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />
        </Stack>
      </Stack>
      <Stack width="100%" justifySelf="end">
        <Button variant="contained" type="submit">
          Continua
        </Button>
        <UndoDialog />
      </Stack>
    </Box>
  );
};
