import { InputAdornment, InputProps, TextFieldProps, Typography } from '@mui/material';
import { Icon, IconType } from '@io-cdc/ui';
import { StyledInput } from './Styled';
import { useMemo } from 'react';

type CdcInputProps = Omit<TextFieldProps, 'onChange'> & {
  icon: IconType;
  onChange: (value: number, key: 'ticketAmount') => void;
};

export const CdcInput = ({ icon, onChange, error, ...rest }: CdcInputProps) => {
  const HelperText = useMemo(
    () => error && 'L’ importo è superiore al credito disponibile',
    [error],
  );
  return (
    <>
      <StyledInput
        type="number"
        id={rest.placeholder}
        onChange={(e) => onChange(Number(e.target.value), 'ticketAmount')}
        error={error}
        helperText={HelperText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon name="euro" />
            </InputAdornment>
          ),
        }}
        label="Importo"
        {...rest}
      />
    </>
  );
};
