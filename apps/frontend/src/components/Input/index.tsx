import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { Icon } from '@io-cdc/ui';

type CdcInputProps = Omit<TextFieldProps, 'onChange'> & { onChange: (s: string) => void };

export const CdcInput = ({ ...props }: CdcInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace('.', ',');
    if (value.startsWith(',')) return;

    const separators = (value.match(/[.,]/g) || []).length;

    if (separators > 1) return;

    const regex = /^\d*[.,]?\d{0,2}$/;
    const isValid = regex.test(value);

    if (!isValid) return;

    props?.onChange?.(value);
  };
  return (
    <TextField
      {...props}
      type="text"
      onChange={handleChange}
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
