import { CdcInput } from '../../../components';
import { useDispatch } from 'react-redux';
import { useCallback /*, useMemo */ } from 'react';
import { ticketsActions } from '../../../features/app/reducers';

type SetAmountProps = {
  amount?: string;
  error: boolean;
  reset: () => void;
  helperText: string | null;
};

export const SetAmount = ({ amount, error, reset, helperText }: SetAmountProps) => {
  const dispatch = useDispatch();

  const onChange = useCallback(
    (amount: string) => {
      reset();
      dispatch(ticketsActions.setAmount(amount));
    },
    [dispatch, reset],
  );

  return (
    <CdcInput
      value={amount}
      onChange={onChange}
      fullWidth
      label="Importo"
      margin="normal"
      error={error}
      helperText={helperText}
    />
  );
};
