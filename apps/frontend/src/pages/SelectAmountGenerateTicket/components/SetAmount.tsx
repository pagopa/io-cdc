import { CdcInput } from '../../../components/Input';
import { useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { ticketsActions } from '../../../features/app/reducers';

type SetAmountProps = {
  amount: string;
  balance: number;
  required: boolean;
  error: boolean;
  reset: () => void;
};

export const SetAmount = ({ amount, balance, error, required, reset }: SetAmountProps) => {
  const dispatch = useDispatch();

  const onChange = useCallback(
    (amount: string) => {
      reset();
      dispatch(ticketsActions.setAmount(amount));
    },
    [dispatch, reset],
  );

  const helperText = useMemo(() => {
    if (!error) return null;
    if (balance < Number(amount)) return 'L’ importo è superiore al credito disponibile';
    if (required) return 'Inserisci un importo';
    return null;
  }, [error, balance, amount, required]);

  return (
    <CdcInput
      value={amount}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      label="Importo"
      margin="normal"
      error={error}
      helperText={helperText}
    />
  );
};
