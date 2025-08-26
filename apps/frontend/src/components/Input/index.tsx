import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { Icon } from '@io-cdc/ui';
import { UseFormRegister } from 'react-hook-form';
import { BonusGeneratorForm } from '../../pages/GenerateTicket/components/NewBonusForm';

type CdcInputProps = Omit<TextFieldProps, 'onChange'> & {
  fieldConfig: ReturnType<UseFormRegister<BonusGeneratorForm>>;
};

export const CdcInput = ({ fieldConfig, ...props }: CdcInputProps) => {
  return (
    <TextField
      type="number"
      {...props}
      {...fieldConfig}
      inputProps={{ inputMode: 'decimal', pattern: '[0-9.,]*' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Icon name="euro" />
          </InputAdornment>
        ),
      }}
      sx={{
        borderRadius: '4px',
        '& .MuiOutlinedInput-notchedOutline': {
          border: '2px solid #e3e7eb',
        },
      }}
    />
  );
};
