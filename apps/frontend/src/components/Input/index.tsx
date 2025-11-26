import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { Icon } from '@io-cdc/ui';

type CdcInputProps = TextFieldProps;

export const CdcInput = ({ ...props }: CdcInputProps) => {
  return (
    <TextField
      {...props}
      focused
      type="number"
      onChange={(e) => {
        if (/^\d*[.,]?\d{0,2}$/.test(e.target.value)) {
          props.onChange?.(e);
        }
      }}
      inputProps={{ inputMode: 'decimal', step: '0.1', lang: 'it-IT' }}
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
