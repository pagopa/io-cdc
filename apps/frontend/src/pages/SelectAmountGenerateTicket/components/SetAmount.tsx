import { CdcInput } from '../../../components';
import { useDispatch } from 'react-redux';
import { useCallback /*, useMemo */ } from 'react';
import { ticketsActions } from '../../../features/app/reducers';

type SetAmountProps = {
  amount: number;
  error: boolean;
  reset: () => void;
  // balance: number;
  // required: boolean;
};

export const SetAmount = ({ amount, error, reset /*, required, balance, */ }: SetAmountProps) => {
  const dispatch = useDispatch();

  const onChange = useCallback(
    (amount: number) => {
      reset();
      dispatch(ticketsActions.setAmount(amount));
    },
    [dispatch, reset],
  );

  // const helperText = useMemo(() => {
  //   if (!error) return null;
  //   if (balance < Number(amount)) return 'L’ importo è superiore al credito disponibile';
  //   if (required) return 'Inserisci un importo';
  //   return null;
  // }, [error, balance, amount, required]);

  return (
    <CdcInput
      value={amount}
      onChange={(e) => onChange(Number(parseFloat(e.target.value).toFixed(2)))}
      fullWidth
      label="Importo"
      margin="normal"
      error={error}
      // helperText={helperText}
    />
  );
};
