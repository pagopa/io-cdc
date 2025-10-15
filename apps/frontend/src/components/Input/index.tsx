import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { Icon } from '@io-cdc/ui';

type CdcInputProps = TextFieldProps;

export const CdcInput = ({ ...props }: CdcInputProps) => {
  return (
    <TextField
      type="number"
      {...props}
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
